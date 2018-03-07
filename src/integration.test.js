/* eslint-env jest */
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import nock from 'nock'

import reducer, { actions, selectors } from './index'

import { mockResults, mockFacets, mockSearchResponse } from './test-helpers'

describe('search', () => {
  let store
  beforeEach(() => {
    store = createStore(reducer, applyMiddleware(thunk))
  })

  describe('page', () => {
    it('is initially undefined, defaults to 1 on search, and changes', () => {
      expect(selectors.getPage(store.getState())).toBeUndefined()
      expect(selectors.getPageLength(store.getState())).toBeUndefined()
      store.dispatch(
        actions.runSearch(selectors.getStagedQuery(store.getState()))
      )
      expect(selectors.getPage(store.getState())).toEqual(1)
      expect(selectors.getPageLength(store.getState())).toEqual(10)
      store.dispatch(actions.changePage(3))
      store.dispatch(
        actions.runSearch(selectors.getStagedQuery(store.getState()))
      )
      expect(selectors.getPage(store.getState())).toEqual(3)
    })
  })

  it('manages constraints', () => {
    expect(selectors.stagedConstraints(store.getState())).toEqual({})
    // TODO: validation that it is valid and not duplicate? Where?
    // Probably not duplicate in reducer, right? A NOOP?
    store.dispatch(actions.addConstraint('eyeColor', 'blue'))
    expect(selectors.stagedConstraints(store.getState())).toEqual({
      eyeColor: {
        and: [
          {
            // TODO: negated: false,
            name: 'blue',
            value: 'blue'
          }
        ]
      }
    })
    store.dispatch(actions.addConstraint('eyeColor', 'brown'))
    expect(selectors.stagedConstraints(store.getState())).toEqual({
      eyeColor: {
        and: [
          { name: 'blue', value: 'blue' },
          { name: 'brown', value: 'brown' }
        ]
      }
    })
    store.dispatch(actions.removeConstraint('eyeColor', 'blue'))
    expect(selectors.stagedConstraints(store.getState())).toEqual({
      eyeColor: { and: [{ name: 'brown', value: 'brown' }] }
    })
    store.dispatch(actions.removeConstraint('eyeColor', 'brown'))
    expect(selectors.stagedConstraints(store.getState())).toEqual({})
  })

  it('manages ORed constraints', () => {
    store.dispatch(actions.addConstraint('eyeColor', 'blue', { boolean: 'or' }))
    store.dispatch(
      actions.addConstraint('eyeColor', 'brown', { boolean: 'or' })
    )
    expect(selectors.stagedConstraints(store.getState())).toEqual({
      eyeColor: {
        or: [{ name: 'blue', value: 'blue' }, { name: 'brown', value: 'brown' }]
      }
    })
    store.dispatch(
      actions.removeConstraint('eyeColor', 'blue', { boolean: 'or' })
    )
    expect(selectors.stagedConstraints(store.getState())).toEqual({
      eyeColor: { or: [{ name: 'brown', value: 'brown' }] }
    })
    store.dispatch(
      actions.removeConstraint('eyeColor', 'brown', { boolean: 'or' })
    )
    expect(selectors.stagedConstraints(store.getState())).toEqual({})
  })

  describe('runSearch', () => {
    afterEach(nock.cleanAll)

    it('runs a successful search', done => {
      nock('http://localhost')
        .post(/search/)
        .reply(200, mockSearchResponse)
      expect(selectors.getSearchResults(store.getState())).toEqual([])
      expect(selectors.isSearchPending(store.getState())).toBe(false)
      const unsubscribe = store.subscribe(() => {
        try {
          expect(selectors.isSearchPending(store.getState())).toBe(true)
          expect(selectors.getSearchResults(store.getState())).toEqual([])
          // Page defaults
          expect(selectors.getPage(store.getState())).toEqual(1)
          expect(selectors.getPageLength(store.getState())).toEqual(10)
        } catch (error) {
          done.fail(error)
        }
        unsubscribe()
      })
      store
        .dispatch(actions.runSearch(selectors.getStagedQuery(store.getState())))
        .then(() => {
          try {
            expect(selectors.isSearchPending(store.getState())).toBe(false)
            expect(selectors.getSearchResults(store.getState())).toEqual(
              mockResults
            )
            expect(selectors.searchFacets(store.getState())).toEqual(mockFacets)
            expect(selectors.getSearchExecutionTime(store.getState())).toEqual(
              0.00198
            )
            expect(selectors.getPage(store.getState())).toEqual(1)
            expect(selectors.getPageLength(store.getState())).toEqual(10)
          } catch (error) {
            done.fail(error)
          }
          done()
        })
    })

    it('responds to queryText changes', done => {
      const mockSearch = jest.fn(() => Promise.resolve({}))
      const mockAPI = { search: mockSearch }
      expect(selectors.getVisibleQueryText(store.getState())).toEqual('')
      store.dispatch(actions.setQueryText('new text'))
      expect(selectors.getVisibleQueryText(store.getState())).toEqual(
        'new text'
      )
      store
        .dispatch(
          actions.runSearch(selectors.getStagedQuery(store.getState()), {
            api: mockAPI
          })
        )
        .then(() => {
          expect(mockSearch).toHaveBeenCalledWith(
            expect.objectContaining({ queryText: 'new text' }),
            expect.anything()
          )
          expect(
            selectors.getExecutedSearchQueryText(store.getState())
          ).toEqual('new text')
          done()
        })
    })

    it('can paginate', done => {
      const mockSearch = jest.fn(() => Promise.resolve({}))
      const mockAPI = { search: mockSearch }
      store.dispatch(actions.changePage(2))
      store
        .dispatch(
          actions.runSearch(selectors.getStagedQuery(store.getState()), {
            api: mockAPI
          })
        )
        .then(() => {
          expect(selectors.getPage(store.getState())).toEqual(2)
          expect(mockSearch).toHaveBeenCalledWith(
            expect.objectContaining({ page: 2 }),
            expect.anything()
          )
          done()
        })
    })

    it('reports error after search failure', done => {
      nock('http://localhost')
        .post(/search/)
        .reply(400, {
          statusCode: 400,
          status: 'Bad Request',
          message: 'REST-INVALIDTYPE: (rest:INVALIDTYPE) Invalid type',
          messageCode: 'REST-INVALIDTYPE'
        })
      expect(selectors.getSearchError(store.getState())).toBeUndefined()
      let isFirstUpdate = true
      store.subscribe(() => {
        if (isFirstUpdate) {
          expect(selectors.getSearchError(store.getState())).toBeUndefined()
          isFirstUpdate = false
        } else {
          expect(selectors.getSearchError(store.getState())).toEqual(
            expect.stringContaining('Invalid type')
          )
          done()
        }
      })
      store.dispatch(
        actions.runSearch(selectors.getStagedQuery(store.getState()))
      )
    })

    it('allows search to be cleared', () => {
      store.dispatch(
        actions.receiveSuccessfulSearch(mockSearchResponse.response)
      )
      expect(selectors.getSearchResults(store.getState())).toEqual(mockResults)
      store.dispatch(actions.clearSearchResults())
      expect(selectors.getSearchResults(store.getState())).toEqual([])
      expect(selectors.isSearchPending(store.getState())).toBe(false)
      expect(selectors.getPage(store.getState())).toBeUndefined()
      expect(selectors.getPageLength(store.getState())).toBeUndefined()
      expect(selectors.getSearchError(store.getState())).toBeUndefined()
    })

    // Could have a long-running search error, while a second search succeeds
    // Successful results should be maintained and error should not enter state
    it('only reacts to the latest executedSearch results')

    it('allows for reducer / action namespacing')
  })
})

/* eslint-env jest */
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import nock from 'nock'

import reducer, { selectors } from './index'
import * as actions from './actions'

import { mockResults, mockFacets, mockSearchResponse } from './test-helpers'

describe('search', () => {
  let store
  beforeEach(() => {
    store = createStore(reducer, applyMiddleware(thunk))
  })

  describe('page', () => {
    it('is initially undefined, defaults to 1 on search, and changes', () => {
      expect(selectors.getPage(store.getState())).toBeUndefined()
      store.dispatch(
        actions.runSearch(
          selectors.getStagedQuery(store.getState())
        )
      )
      expect(selectors.getPage(store.getState())).toEqual(1)
      store.dispatch(actions.changePage(3))
      store.dispatch(
        actions.runSearch(
          selectors.getStagedQuery(store.getState())
        )
      )
      expect(selectors.getPage(store.getState())).toEqual(3)
    })
  })

  describe('runSearch', () => {
    afterEach(nock.cleanAll)

    it('runs a successful search', (done) => {
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
      store.dispatch(actions.runSearch(
        selectors.getStagedQuery(store.getState())
      )).then(() => {
        try {
          expect(selectors.isSearchPending(store.getState())).toBe(false)
          expect(selectors.getSearchResults(store.getState())).toEqual(mockResults)
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

    it('responds to queryText changes', (done) => {
      const mockSearch = jest.fn(() => Promise.resolve({}))
      const mockAPI = { search: mockSearch }
      expect(selectors.getVisibleQueryText(store.getState())).toEqual('')
      store.dispatch(actions.setQueryText('new text'))
      expect(
        selectors.getVisibleQueryText(store.getState())
      ).toEqual('new text')
      store.dispatch(actions.runSearch(
        selectors.getStagedQuery(store.getState()),
        {api: mockAPI}
      )).then(() => {
        expect(mockSearch).toHaveBeenCalledWith(
          expect.objectContaining({queryText: 'new text'})
        )
        expect(
          selectors.getExecutedSearchQueryText(store.getState())
        ).toEqual('new text')
        done()
      })
    })

    it('can paginate', (done) => {
      nock('http://localhost')
        .post(/search/)
        .reply(200, mockSearchResponse)
      store.dispatch(actions.changePage(2))
      store.dispatch(actions.runSearch(
        selectors.getStagedQuery(store.getState())
      )).then(() => {
        expect(selectors.getPage(store.getState())).toEqual(2)
        done()
      })
    })

    it('reports error after search failure', (done) => {
      nock('http://localhost')
        .post(/search/)
        .reply(400, {
          errorResponse: {
            statusCode: 400,
            status: 'Bad Request',
            message: 'REST-INVALIDTYPE: (rest:INVALIDTYPE) Invalid type',
            messageCode: 'REST-INVALIDTYPE'
          }
        })
      expect(selectors.getSearchError(store.getState())).toBeUndefined()
      let isFirstUpdate = true
      store.subscribe(() => {
        if (isFirstUpdate) {
          expect(selectors.getSearchError(store.getState())).toBeUndefined()
          isFirstUpdate = false
        } else {
          expect(selectors.getSearchError(store.getState())).toEqual(
            expect.stringContaining('error')
          )
          done()
        }
      })
      store.dispatch(
        actions.runSearch(
          selectors.getStagedQuery(store.getState())
        )
      )
    })
  })
})

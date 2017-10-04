/* eslint-env jest */
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import nock from 'nock'

import reducer, { searchSelectors as selectors } from './reducers'
import * as actions from './actions'

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

  describe('runSearch failure and error reporting', () => {
    afterEach(nock.cleanAll)

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
      expect(selectors.getError(store.getState())).toBeUndefined()
      let isFirstUpdate = true
      store.subscribe(() => {
        if (isFirstUpdate) {
          expect(selectors.getError(store.getState())).toBeUndefined()
          isFirstUpdate = false
        } else {
          expect(selectors.getError(store.getState())).toEqual(
            'Search error: Bad Request'
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

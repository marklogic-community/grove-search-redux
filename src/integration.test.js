/* eslint-env jest */
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer, { searchSelectors as selectors } from './reducers'
import * as actions from './actions'

describe('search API', () => {
  describe('page', () => {
    it('is initially undefined, defaults to 1 on search, and changes', () => {
      const store = createStore(reducer, applyMiddleware(thunk))
      expect(selectors.getPage(store.getState())).toBeUndefined()
      store.dispatch(
        actions.runSearch(
          selectors.getPreExecutedQuery(store.getState())
        )
      )
      expect(selectors.getPage(store.getState())).toEqual(1)
      store.dispatch(actions.changePage(3))
      store.dispatch(
        actions.runSearch(
          selectors.getPreExecutedQuery(store.getState())
        )
      )
      expect(selectors.getPage(store.getState())).toEqual(3)
    })
  })
})

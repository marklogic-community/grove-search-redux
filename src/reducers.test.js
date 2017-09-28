/* eslint-env jest */
import reducer, { searchSelectors as selectors } from './reducers'
import * as types from './actionTypes'

import {
  initialState,
  userCreatedSearchState,
  pendingExecutedState,
  finishedExecutedState
} from './test-helpers'

describe('search reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe('SEARCH_REQUESTED', () => {
    it('hydrates the search based on preExecutedSearch', () => {
      expect(
        reducer(userCreatedSearchState, {
          type: types.SEARCH_REQUESTED
        })
      ).toEqual({
        ...pendingExecutedState,
        executedSearch: {
          ...pendingExecutedState.executedSearch,
          id: expect.anything()
        }
      })
    })

    // This might become useful eventually, so leaving this idea here
    // it('allows the search query to be set explicitly with payload')

    it('clears the previous search', () => {
      const newInitialState = {
        ...finishedExecutedState,
        executedSearch: {
          ...finishedExecutedState,
          id: 'earlierSearchId',
          results: [1, 2, 3],
          query: {
            ...finishedExecutedState,
            qtext: 'earlier search qtext'
          }
        }
      }
      const resultingState = reducer(newInitialState, {
        type: types.SEARCH_REQUESTED,
        payload: {qtext: 'qtext'}
      })
      expect(resultingState).toEqual(pendingExecutedState)
      // Ensure that ids are different, because pendingExecutedState
      // uses expect.anything() for id
      expect(
        selectors.getExecutedSearchId({search: resultingState})
      ).not.toEqual(
        selectors.getExecutedSearchId({search: newInitialState})
      )
    })
  })

  const mockResponse = {
    results: [{
      uri: '1.json',
      label: 'Label',
      matches: []
    }]
    // facets: {
    //   Category: {type: 'xs:string', facetValues: []}
    // }
  }
  const executedState = {
    ...pendingExecutedState,
    executedSearch: {
      ...pendingExecutedState.executedSearch,
      pending: false,
      ...mockResponse
    }
  }

  describe('SEARCH_SUCCESS', () => {
    it('updates executedSearch with results, facets, and turns off pending', () => {
      expect(
        reducer(pendingExecutedState, {
          type: types.SEARCH_SUCCESS,
          payload: {
            ...mockResponse,
            id: 'pendingID'
          }
        })
      ).toEqual(executedState)
    })

    it('eliminates race conditions')
  })

  describe('SEARCH_FAILURE', () => {
    it('adds error and removes pending state', () => {
      const expectedState = {
        ...pendingExecutedState,
        executedSearch: {
          ...pendingExecutedState.executedSearch,
          pending: false,
          error: 'An error'
        }
      }
      expect(
        reducer(pendingExecutedState, {
          type: types.SEARCH_FAILURE,
          payload: { error: 'An error' }
        })
      ).toEqual(expectedState)
    })

    it('eliminates race conditions')
  })

  describe('SET_QTEXT', () => {
    it('works', () => {
      const expectedState = {
        ...initialState,
        preExecutedSearch: {
          ...initialState.preExecutedSearch,
          qtext: 'new qtext'
        }
      }
      expect(
        reducer(initialState, {
          type: types.SET_QTEXT,
          payload: {qtext: 'new qtext'}
        })
      ).toEqual(expectedState)
    })
  })

  describe('getSearchResults', () => {
    it('works', () => {
      const results = [{
        uri: '1.json',
        label: 'Label',
        matches: []
      }]
      const mockState = {
        search: {
          ...initialState,
          executedSearch: {
            ...initialState.executedSearch,
            results: results
          }
        }
      }
      expect(selectors.getSearchResults(mockState)).toEqual(results)
    })
  })

  describe('getConstraints', () => {
    it('works', () => {
      const constraints = [
        {
          Products: 'Hammer'
        }
      ]
      const mockState = {
        search: {
          ...executedState,
          executedSearch: {
            ...executedState.executedSearch,
            query: {
              ...executedState.executedSearch.query,
              constraints: constraints
            }
          }
        }
      }
      expect(selectors.getConstraints(mockState)).toEqual(constraints)
    })
  })

  describe('getPage', () => {
    it('works', () => {
      expect(selectors.getPage({search: executedState})).toEqual(1)
    })
  })

  describe('getPageLength', () => {
    it('works', () => {
      expect(selectors.getPageLength({search: executedState})).toEqual(10)
    })
  })

  const executedSearchState = {
    search: finishedExecutedState
  }

  // TODO: make these work by sending in actions instead of asserting on state
  // shape. It might be even better to test actions and selectors together,
  // using the one to assert on the other, leaving state shape as an untested
  // implementation detail.

  describe('getExecutedSearch', () => {
    it('works', () => {
      expect(
        selectors.getExecutedSearch(executedSearchState)
      ).toEqual(finishedExecutedState.executedSearch)
    })
  })

  describe('getExecutedSearchQuery', () => {
    it('works', () => {
      expect(
        selectors.getExecutedSearchQuery(executedSearchState)
      ).toEqual(finishedExecutedState.executedSearch.query)
    })
  })

  describe('getExecutedSearchQtext', () => {
    it('works', () => {
      expect(
        selectors.getExecutedSearchQtext(executedSearchState)
      ).toEqual(finishedExecutedState.executedSearch.query.qtext)
    })
  })

  describe('getVisibleQtext', () => {
    const mockState = {
      search: {
        ...initialState,
        qtext: 'visible qtext'
      }
    }
    it('works', () => {
      expect(selectors.getVisibleQtext(mockState)).toEqual('visible qtext')
    })
  })
})

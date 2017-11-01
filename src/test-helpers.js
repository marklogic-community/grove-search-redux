/* eslint-env jest */
import deepFreeze from 'deep-freeze'

// TODO: should the search options name be part of the Redux store?
export const initialState = {
  stagedSearch: {
    qtext: '',
    page: 1,
    pageLength: 10
  },
  executedSearch: {}
}
deepFreeze(initialState)

export const userCreatedSearchState = {
  ...initialState,
  stagedSearch: {
    ...initialState.stagedSearch,
    qtext: 'qtext'
  }
}
deepFreeze(userCreatedSearchState)

export const pendingExecutedState = {
  ...userCreatedSearchState,
  executedSearch: {
    id: expect.any(String), // TODO: Eliminate race conditions
    //  TODO: getSearchStatus
    pending: true,
    response: {
      executionTime: undefined,
      total: undefined,
      // facets: {},
      results: [],
      error: undefined
    },
    query: {...userCreatedSearchState.stagedSearch}
  }
}
deepFreeze(pendingExecutedState)

export const mockResults = [{
  uri: '1.json',
  label: 'Label',
  matches: []
}]

export const mockSearchResponse = {
  executionTime: 0.00198,
  total: 1,
  results: mockResults
  // facets: {
  //   Category: {type: 'xs:string', facetValues: []}
  // }
}

export const finishedExecutedState = {
  ...pendingExecutedState,
  executedSearch: {
    ...pendingExecutedState.executedSearch,
    pending: false,
    response: {
      ...pendingExecutedState.executedSearch.response,
      ...mockSearchResponse
    }
  }
}
deepFreeze(finishedExecutedState)

export const failedState = {
  ...pendingExecutedState,
  executedSearch: {
    ...pendingExecutedState.executedSearch,
    pending: false,
    response: {
      ...pendingExecutedState.executedSearch.response,
      error: 'An error'
    }
  }
}
deepFreeze(failedState)

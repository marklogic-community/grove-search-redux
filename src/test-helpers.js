/* eslint-env jest */
import deepFreeze from 'deep-freeze'

// TODO: should the search options name be part of the Redux store?
export const initialState = {
  // suggestPending: false,
  // optionsPending: false,
  // TODO? Separate out queryReducer?
  preExecutedSearch: {
    qtext: '',
    page: 1,
    pageLength: 10
  },
  // suggestQtext: '',
  executedSearch: undefined
  // options: {},
  // suggestions: []
}
deepFreeze(initialState)

export const userCreatedSearchState = {
  ...initialState,
  preExecutedSearch: {
    ...initialState.preExecutedSearch,
    qtext: 'qtext'
  }
}
deepFreeze(userCreatedSearchState)

export const pendingExecutedState = {
  ...userCreatedSearchState,
  executedSearch: {
    id: expect.anything(), // TODO: Eliminate race conditions
    //  TODO: getSearchStatus
    pending: true,
    executionTime: undefined,
    total: undefined,
    results: [],
    // facets: {},
    error: undefined,
    query: {...userCreatedSearchState.preExecutedSearch}
  }
}
deepFreeze(pendingExecutedState)

export const mockSearchResponse = {
  executionTime: 0.00198,
  total: 1,
  results: [{
    uri: '1.json',
    label: 'Label',
    matches: []
  }]
  // facets: {
  //   Category: {type: 'xs:string', facetValues: []}
  // }
}

export const finishedExecutedState = {
  ...pendingExecutedState,
  executedSearch: {
    ...pendingExecutedState.executedSearch,
    pending: false,
    executionTime: 0.00198,
    total: 1
  }
}
deepFreeze(finishedExecutedState)

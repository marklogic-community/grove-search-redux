/* eslint-env jest */
import deepFreeze from 'deep-freeze'

// TODO: should the search options name be part of the Redux store?
export const initialState = {
  stagedSearch: {
    queryText: '',
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
    queryText: 'queryText'
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
      // metadata: undefined
      // facets: {},
      results: []
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

export const mockFacets = {
  'EyeColor': [
    {
      name: 'blue',
      value: 'blue',
      frequency: 30
    },
    {
      name: 'brown',
      value: 'brown',
      frequency: 60
    }
  ]
}

export const mockSearchResponse = {
  response: {
    metadata: {
      executionTime: 0.00198,
      total: 1
    },
    results: mockResults,
    facets: mockFacets
  }
}

export const finishedExecutedState = {
  ...pendingExecutedState,
  executedSearch: {
    ...pendingExecutedState.executedSearch,
    pending: false,
    response: {
      ...pendingExecutedState.executedSearch.response,
      ...mockSearchResponse.response
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

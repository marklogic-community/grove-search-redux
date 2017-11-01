import * as types from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case types.SEARCH_REQUESTED:
      return {
        id: Math.random().toString().substr(2, 10),
        pending: true,
        response: {
          results: [],
          // facets: {},
          error: undefined
        },
        query: {...action.payload.query}
      }
    case types.SEARCH_SUCCESS: {
      const response = action.payload
      return {
        ...state,
        pending: false,
        response: {
          results: response.results,
          total: response.total,
          // facets: response.facets,
          executionTime: response.executionTime
        }
      }
    }
    case types.SEARCH_FAILURE:
      return {
        ...state,
        pending: false,
        response: {
          ...state.response,
          error: action.payload && action.payload.error
        }
      }
    default:
      return state
  }
}

// SELECTORS
const getExecutedSearchQuery = state => {
  return state && state.query
}
const getSearchResponse = state => {
  return state && state.response
}

const getFromExecutedSearch = (state, propertyName) => {
  return state && state[propertyName]
}
const getFromExecutedSearchQuery = (state, propertyName) => {
  const query = getExecutedSearchQuery(state)
  return query && query[propertyName]
}
const getFromSearchResponse = (state, propertyName) => {
  const response = getSearchResponse(state)
  return response && response[propertyName]
}

const getSearchTotal = state => getFromSearchResponse(state, 'total')

const getPageLength = state =>
  getFromExecutedSearchQuery(state, 'pageLength')
const isSearchPending = state => getFromExecutedSearch(state, 'pending')

export const selectors = {
  // Executed search bookkeeping
  getExecutedSearch: state => state,
  getExecutedSearchId: state => state.id,
  isSearchPending: isSearchPending,

  // From executed search query
  getExecutedSearchQuery: getExecutedSearchQuery,
  // getConstraints: state => getExecutedSearchQuery(state).constraints,
  getPage: state => getFromExecutedSearchQuery(state, 'page'),
  getPageLength: getPageLength,
  getExecutedSearchQtext: state => getFromExecutedSearchQuery(state, 'qtext'),

  // From search response
  // getSearchResponse: getSearchResponse,
  getSearchResults: state => getFromSearchResponse(state, 'results'),
  getSearchTotal: getSearchTotal,
  getSearchExecutionTime: state => getFromSearchResponse(state, 'executionTime'),
  getError: state => getFromSearchResponse(state, 'error'),

  // Calculated
  getSearchTotalPages: state => Math.ceil(
    getSearchTotal(state) / getPageLength(state)
  ),
  // TODO: test
  isSearchComplete: state => state.response && !isSearchPending(state)
}

import * as types from './actionTypes'

/**
 * Search reducer state shape
 * Using TypeScript format, though not currently evaluated
 *
 * interface ISearchQuery {
 *   qtext:string
 *   page: number,
 *   pageLength: number
 * }
 *
 * interface ISearchResult {
 *   TODO
 * }
 *
 * interface ISearchState {
 *   stagedSearch: ISearchQuery,
 *   executedSearch: {
 *     id: string,
 *     pending: boolean,
 *     response: {
 *       metadata: {
   *       total: number,
   *       executionTime: number,
 *       }
 *       results: Array<ISearchResult>,
 *       facets: {},
 *       error: string
 *     },
 *     query: ISearchQuery
 *   }
 * }
 *
 */

const initialState = {
  // suggestPending: false,
  // optionsPending: false,
  stagedSearch: {
    qtext: '',
    page: 1,
    pageLength: 10
  },
  // suggestQtext: '',
  executedSearch: undefined
  // options: {},
  // suggestions: []
}

// TODO: compose stagedSearch and executedSearch composers
export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_QTEXT:
      return {
        ...state,
        stagedSearch: {
          ...state.stagedSearch,
          qtext: action.payload.qtext
        }
      }

    case types.CHANGE_PAGE:
      return {
        ...state,
        stagedSearch: {
          ...state.stagedSearch,
          page: action.payload.page
        }
      }

    // case types.PAGE_LENGTH:
    //   return {
    //     ...state,
    //     pageLength: action.payload
    //   }

    // case types.CONSTRAINT_ADD: {
    //   let c = action.payload
    //   let constraints = {...state.constraints}
    //   let constraint = constraints[c.name] =  {...constraints[c.name]}
    //   constraint.values = [...(constraint.values || []), c.value]

    //   return {
    //     ...state,
    //     constraints
    //   }
    // }

    // case types.CONSTRAINT_REMOVE: {
    //   let c = action.payload
    //   let constraints = {...state.constraints}
    //   let constraint = constraints[c.name] = {...constraints[c.name]}
    //   if (constraint && constraint.values) {
    //     constraint.values = constraint.values.filter(x => x !== c.value)
    //   }

    //   return {
    //     ...state,
    //     constraints
    //   }
    // }

    // case types.SUGGEST_REQUESTED:
    //   return {
    //     ...state,
    //     suggestPending: true,
    //     suggestQtext: action.payload || ''
    //   }

    // case types.SUGGEST_SUCCESS:
    //   return {
    //     ...state,
    //     suggestPending: false,
    //     // suggestQtext: '',
    //     suggestions: action.payload.suggestions || []
    //   }

    // case types.SUGGEST_FAILURE:
    //   return {
    //     ...state,
    //     // TODO: put error somewhere
    //     suggestPending: false,
    //     // suggestQtext: '',
    //     suggestions: []
    //   }

    case types.SEARCH_REQUESTED:
      return {
        ...state,
        executedSearch: {
          id: Math.random().toString().substr(2, 10),
          pending: true,
          response: {
            results: [],
            // facets: {},
            error: undefined
          },
          // TODO: Now we are accessing stagedSearch to do this
          // This prevents us from breaking up this reducer.
          // Should we instead require that the search be part of the payload?
          query: {...state.stagedSearch}
        }
      }

    case types.SEARCH_SUCCESS: {
      const response = action.payload
      return {
        ...state,
        executedSearch: {
          ...state.executedSearch,
          pending: false,
          response: {
            results: response.results,
            total: response.total,
            // facets: response.facets,
            executionTime: response.executionTime
          }
        }
        // suggestQtext: '',
      }
    }

    case types.SEARCH_FAILURE:
      return {
        ...state,
        executedSearch: {
          ...state.executedSearch,
          pending: false,
          response: {
            ...state.executedSearch.response,
            error: action.payload && action.payload.error
          }
        }
        // suggestQtext: '',
      }

    // case types.OPTIONS_REQUESTED:
    //   return {
    //     ...state,
    //     optionsPending: true
    //   }

    // case types.OPTIONS_SUCCESS: {
    //   let opts = action.payload.options
    //   let constraints = {}
    //   opts.constraint.forEach(c => constraints[c.name] = c)
    //   return {
    //     ...state,
    //     optionsPending: false,
    //     // TODO: merge values?
    //     constraints: constraints,
    //     options: opts
    //   }
    // }

    // case types.OPTIONS_FAILURE:
    //   return {
    //     ...state,
    //     // TODO: put error somewhere
    //     optionsPending: false,
    //     options: {}
    //   }
    case types.DETAIL_REQUESTED:
      return {
        ...state,
        executedDetail: {
          id: Math.random().toString().substr(2, 10),
          pending: true,
          response: {
            data: {},
            error: undefined
          }
          // TODO: Now we are accessing stagedSearch to do this
          // This prevents us from breaking up this reducer.
          // Should we instead require that the search be part of the payload?
        }
      }
    case types.DETAIL_SUCCESS: {
      const response = action.payload.resp.detailResponse
      return {
        ...state,
        executedDetail: {
          ...state.executedDetail,
          pending: false,
          response: {
            data: response
          }
        }
        // suggestQtext: '',
      }
    }

    case types.DETAIL_FAILURE:
      return {
        ...state,
        executedDetail: {
          ...state.executedDetail,
          pending: false,
          response: {
            ...state.executedDetail.response,
            error: action.payload && action.payload.error
          }
        }
        // suggestQtext: '',
      }

    default:
      return state
  }
}

const getStagedQuery = state => state.stagedSearch

const getExecutedSearch = state => state.executedSearch
const getExecutedSearchQuery = state => {
  const search = getExecutedSearch(state)
  return search && search.query
}
const getSearchResponse = state => {
  const search = getExecutedSearch(state)
  return search && search.response
}

const getFromExecutedSearch = (state, propertyName) => {
  const search = getExecutedSearch(state)
  return search && search[propertyName]
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

const getExecutedDetail = state => state.executedDetail

const getFromExecutedDetail = (state, propertyName) => {
  const detail = getExecutedDetail(state)
  return detail && detail[propertyName]
}

const getDetailResponse = state => {
  const detail = getExecutedDetail(state)
  return detail && detail.response
}

const getFromDetailResponse = (state, propertyName) => {
  const response = getDetailResponse(state)
  return response && response[propertyName]
}

const isDetailPending = state => getFromExecutedDetail(state, 'pending')

export const searchSelectors = {
  // From stagedSearch
  getStagedQuery: getStagedQuery,
  getVisibleQtext: state => getStagedQuery(state).qtext,

  // Executed search bookkeeping
  getExecutedSearch: getExecutedSearch,
  getExecutedSearchId: state => getExecutedSearch(state).id,
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
  isSearchComplete: state => getExecutedSearch(state) && !isSearchPending(state),

  // Detail page loads
  isDetailPending: isDetailPending,
  isDetailComplete: state => getExecutedDetail(state) && !isDetailPending(state),
  getDetail: state => getFromDetailResponse(state, 'detail')
}

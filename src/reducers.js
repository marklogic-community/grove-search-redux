import * as types from './actionTypes'

const initialState = {
  // suggestPending: false,
  // optionsPending: false,
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

const emptyResponse = {
  results: []
  // facets: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_QTEXT:
      return {
        ...state,
        preExecutedSearch: {
          ...state.preExecutedSearch,
          qtext: action.payload.qtext
        }
      }

    // case types.PAGINATE:
    //   return {
    //     ...state,
    //     page: action.payload
    //   }

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
          // TODO: re-initialize results and facets each time
          pending: true,
          results: [],
          // facets: {},
          error: undefined,
          id: Math.random().toString().substr(2, 10),
          // TODO: Now we are accessing preExecutedSearch to do this
          // This prevents us from breaking up this reducer.
          // Should we instead require that the search be part of the payload?
          query: {...state.preExecutedSearch}
        }
      }

    case types.SEARCH_SUCCESS: {
      const response = action.payload || emptyResponse
      return {
        ...state,
        executedSearch: {
          ...state.executedSearch,
          pending: false,
          results: response.results,
          total: response.total,
          executionTime: response.executionTime
          // facets: response.facets
        }
        // suggestQtext: '',
      }
    }

    case types.SEARCH_FAILURE:
      return {
        ...state,
        executedSearch: {
          ...state.executedSearch,
          ...emptyResponse,
          pending: false,
          error: action.payload && action.payload.error
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

    default:
      return state
  }
}

const getExecutedSearch = state => state.search.executedSearch
const getExecutedSearchQuery = state => {
  const search = getExecutedSearch(state)
  return search && search.query
}

const getFromExecutedSearchQuery = (state, propertyName) => {
  const query = getExecutedSearchQuery(state)
  return query && query[propertyName]
}

export const searchSelectors = {
  getVisibleQtext: state => state.search.qtext,

  getExecutedSearch: getExecutedSearch,
  getSearchResults: state => getExecutedSearch(state).results,
  getExecutedSearchId: state => getExecutedSearch(state).id,

  getExecutedSearchQuery: getExecutedSearchQuery,
  getConstraints: state => getExecutedSearchQuery(state).constraints,
  getPage: state => getFromExecutedSearchQuery(state, 'page'),
  getPageLength: state => getFromExecutedSearchQuery(state, 'pageLength'),
  getExecutedSearchQtext: state => getFromExecutedSearchQuery(state, 'qtext')
}

import { combineReducers } from 'redux'
import stagedSearch, {selectors as stagedSelectors} from './stagedSearch'
import executedSearch, {selectors as executedSelectors} from './executedSearch'
// TODO: extract documents to one level up (ml-documents-redux)
import documents, {selectors as documentSelectors} from './documents'
import * as types from '../actionTypes'

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
const executedDetail = (state = {}, action) => {
  switch (action.type) {
    case types.DETAIL_REQUESTED:
      return {
        id: Math.random().toString().substr(2, 10),
        pending: true,
        response: {
          detail: {},
          error: undefined
        }
      }
    case types.DETAIL_SUCCESS: {
      const response = action.payload.resp.detailResponse
      return {
        ...state.executedDetail,
        pending: false,
        response: {
          detail: response
        }
      }
    }
    case types.DETAIL_FAILURE:
      return {
        ...state.executedDetail,
        pending: false,
        response: {
          ...state.executedDetail.response,
          error: action.payload && action.payload.error
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  stagedSearch,
  executedSearch,
  executedDetail,
  documents
})
// export default (state = initialState, action) => {
//   switch (action.type) {

//     // case types.PAGE_LENGTH:
//     //   return {
//     //     ...state,
//     //     pageLength: action.payload
//     //   }

//     // case types.CONSTRAINT_ADD: {
//     //   let c = action.payload
//     //   let constraints = {...state.constraints}
//     //   let constraint = constraints[c.name] =  {...constraints[c.name]}
//     //   constraint.values = [...(constraint.values || []), c.value]

//     //   return {
//     //     ...state,
//     //     constraints
//     //   }
//     // }

//     // case types.CONSTRAINT_REMOVE: {
//     //   let c = action.payload
//     //   let constraints = {...state.constraints}
//     //   let constraint = constraints[c.name] = {...constraints[c.name]}
//     //   if (constraint && constraint.values) {
//     //     constraint.values = constraint.values.filter(x => x !== c.value)
//     //   }

//     //   return {
//     //     ...state,
//     //     constraints
//     //   }
//     // }

//     // case types.SUGGEST_REQUESTED:
//     //   return {
//     //     ...state,
//     //     suggestPending: true,
//     //     suggestQtext: action.payload || ''
//     //   }

//     // case types.SUGGEST_SUCCESS:
//     //   return {
//     //     ...state,
//     //     suggestPending: false,
//     //     // suggestQtext: '',
//     //     suggestions: action.payload.suggestions || []
//     //   }

//     // case types.SUGGEST_FAILURE:
//     //   return {
//     //     ...state,
//     //     // TODO: put error somewhere
//     //     suggestPending: false,
//     //     // suggestQtext: '',
//     //     suggestions: []
//     //   }

//     // case types.OPTIONS_REQUESTED:
//     //   return {
//     //     ...state,
//     //     optionsPending: true
//     //   }

//     // case types.OPTIONS_SUCCESS: {
//     //   let opts = action.payload.options
//     //   let constraints = {}
//     //   opts.constraint.forEach(c => constraints[c.name] = c)
//     //   return {
//     //     ...state,
//     //     optionsPending: false,
//     //     // TODO: merge values?
//     //     constraints: constraints,
//     //     options: opts
//     //   }
//     // }

//     // case types.OPTIONS_FAILURE:
//     //   return {
//     //     ...state,
//     //     // TODO: put error somewhere
//     //     optionsPending: false,
//     //     options: {}
//     //   }

//     default:
//       return state
//   }
// }

// SELECTORS
const bindSelector = (selector, mountPoint) => {
  return (state, ...args) => {
    return selector(state[mountPoint], ...args)
  }
}

const bindSelectors = (selectors, mountPoint) => {
  return Object.keys(selectors).reduce((bound, key) => {
    bound[key] = bindSelector(selectors[key], mountPoint)
    return bound
  }, {})
}

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

export const selectors = {
  ...bindSelectors(executedSelectors, 'executedSearch'),
  ...bindSelectors(stagedSelectors, 'stagedSearch'),
  ...bindSelectors(documentSelectors, 'documents'),
  isDetailPending: isDetailPending,
  isDetailComplete: state => getExecutedDetail(state) && !isDetailPending(state),
  getDetail: state => getFromDetailResponse(state, 'detail')
}

// Public API for the search module
import reducer, { selectors } from './reducers'
import * as actions from './actions'
import * as actionTypes from './actionTypes'

// Lower-level reducers for composition
import executedSearchReducer, {
  selectors as executedSearchSelectors
} from './reducers/executedSearch'

export default reducer
export {
  selectors,
  actions,
  actionTypes,
  executedSearchReducer,
  executedSearchSelectors
}

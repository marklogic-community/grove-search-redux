// Public API for the search module
import searchReducer, { searchSelectors } from './reducers'
import * as searchActions from './actions'
import * as searchActionTypes from './actionTypes'

export default searchReducer
export { searchSelectors, searchActions, searchActionTypes }

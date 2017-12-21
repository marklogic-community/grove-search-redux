import * as types from '../actionTypes'

export default (state = {queryText: '', page: 1, pageLength: 10}, action) => {
  switch (action.type) {
    case types.SET_QUERYTEXT:
      return {
        ...state,
        queryText: action.payload.queryText
      }
    case types.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page
      }
    default:
      return state
  }
}

// SELECTORS
export const selectors = {
  getStagedQuery: state => state,
  getVisibleQueryText: state => state.queryText
}

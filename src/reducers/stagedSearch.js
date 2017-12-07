import * as types from '../actionTypes'

export default (state = {qtext: '', page: 1, pageLength: 10}, action) => {
  switch (action.type) {
    case types.SET_QTEXT:
      return {
        ...state,
        qtext: action.payload.qtext
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
  getVisibleQtext: state => state.qtext
}

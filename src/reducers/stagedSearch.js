import { combineReducers } from 'redux'
import * as types from '../actionTypes'

const queryText = (state = '', action) => {
  switch (action.type) {
    case types.SET_QUERYTEXT:
      return action.payload.queryText
    default:
      return state
  }
}

const page = (state = 1, action) => {
  switch (action.type) {
    case types.CHANGE_PAGE:
      return action.payload.page
    default:
      return state
  }
}

const pageLength = (state = 10, action) => {
  return state
}

const constraints = (state = {}, action) => {
  let name
  switch (action.type) {
    case types.CONSTRAINT_ADD:
      name = action.payload.constraintName
      return {
        ...state,
        [name]: [
          ...(state[name] || []),
          { name: action.payload.value }
        ]
      }
    case types.CONSTRAINT_REMOVE:
      name = action.payload.constraintName
      let filtered = state[name].filter(constraintValue => (
        constraintValue.name !== action.payload.value
      ))
      if (filtered.length === 0) {
        // immutably remove the entry from state altogether
        let clone = Object.assign({}, state)
        delete clone[name]
        return clone
      } else {
        return { ...state, [name]: filtered }
      }
    default:
      return state
  }
}

export default combineReducers({
  queryText, page, pageLength, constraints
})

// SELECTORS
export const selectors = {
  getStagedQuery: state => state,
  getVisibleQueryText: state => state.queryText,
  stagedConstraints: state => state.constraints
}

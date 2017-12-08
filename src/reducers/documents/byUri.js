import * as types from '../../actionTypes'

// TODO: extract, which may make writing the selectors simpler
const documentReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_DOC_REQUESTED:
      return {
        ...state,
        pending: true
      }
    case types.FETCH_DOC_SUCCESS:
      return {
        ...state,
        content: action.payload.response.content,
        pending: false
      }
    default:
      return state
  }
}

export default (state = {}, action) => {
  if (action.payload && action.payload.docUri) {
    return {
      ...state,
      [action.payload.docUri]: documentReducer(
        state[action.payload.docUri], action
      )
    }
  }
  return state
}

// SELECTORS
export const selectors = {
  isDocumentFetchPending: (state, docUri) => (
    !!(state[docUri] && state[docUri].pending)
  ),
  documentByUri: (state, docUri) => state[docUri] && state[docUri].content
}

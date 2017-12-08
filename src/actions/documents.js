/* global fetch, URL */
// TODO: extract documents to one level up (ml-documents-redux)
import * as types from '../actionTypes'

require('isomorphic-fetch')

export const fetchDoc = (docUri) => {
  return (dispatch) => {
    dispatch({
      type: types.FETCH_DOC_REQUESTED,
      payload: {docUri}
    })

    // TODO: wrap in API object
    return fetch(new URL('/api/documents?uri=' + docUri, document.baseURI).toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) throw new Error(response.statusText)
      return response.json()
    }).then(
      response => dispatch({
        type: types.FETCH_DOC_SUCCESS,
        payload: {
          response,
          docUri
        }
      }),
      error => dispatch({
        type: types.FETCH_DOC_FAILURE,
        payload: {
          error: 'Error fetching document: ' + error.message,
          docUri
        }
      })
    )
  }
}

// export const fetchDocIfNeeded = () => {
//   return {
//     type: ''
//   }
// }

/* global fetch, URL */
import * as types from './actionTypes'
// TODO: remove /api/search?
// import searchAPI from './api/search'
require('isomorphic-fetch')

export const runSearch = (searchQuery) => {
  return (dispatch) => {
    dispatch({
      type: types.SEARCH_REQUESTED,
      payload: {query: searchQuery}
    })

    // TODO: send a request directly to middle-tier
    // with query options, qtext, combined query object as object
    return fetch(new URL('/api/search', document.baseURI).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchQuery)
    }).then(resp => {
      if (!resp.ok) throw new Error(resp.statusText)
      return resp.json()
    }).then(
      resp => dispatch({ type: types.SEARCH_SUCCESS, payload: resp }),
      error => dispatch({
        type: types.SEARCH_FAILURE,
        payload: {
          error: 'Search error: ' + error.message
        }
      })
    )
  }
}

// export const suggest = (qtext) => {
//   return (dispatch, getState) => {
//     dispatch({ type: types.SUGGEST_REQUESTED, payload: qtext })

//     let state = getState().search
//     let query = qb.ext.combined(constraintQuery(state.constraints), state.qtext)

//     return client.suggest(state.suggestQtext, query, { options: 'all' })
//       .then(resp => {
//         if (!resp.ok) throw new Error('bad search')
//         return resp.json()
//       })
//       .then(
//         resp => dispatch({ type: types.SUGGEST_SUCCESS, payload: resp }),
//         resp => dispatch({ type: types.SUGGEST_FAILURE, payload: resp }),
//       )
//   }
// }

// export const options = () => {
//   return dispatch => {
//     dispatch({ type: types.OPTIONS_REQUESTED })

//     return client.options('all')
//     // !resp.ok?
//       .then(resp => resp.json())
//       .then(resp => {
//         if (!(resp && resp.options)) throw new TypeError('invalid options')
//         return resp
//       })
//       .then(
//         resp => dispatch({ type: types.OPTIONS_SUCCESS, payload: resp }),
//         resp => dispatch({ type: types.OPTIONS_FAILURE, payload: resp })
//       )
//   }
// }

export const setQtext = (qtext) => {
  return {
    type: types.SET_QTEXT,
    payload: {qtext}
  }
}

export const changePage = (n) => {
  return { type: types.CHANGE_PAGE, payload: {page: n} }
}

// export const pageLength = (l) => {
//   return dispatch => {
//     dispatch({ type: types.PAGE_LENGTH, payload: l })
//     return dispatch(runSearch())
//   }
// }

// export const addConstraint = (c) => {
//   return dispatch => {
//     dispatch({ type: CONSTRAINT_ADD, payload: c })
//     return dispatch(runSearch())
//   }
// }

// export const rmConstraint = (c) => {
//   return dispatch => {
//     dispatch({ type: CONSTRAINT_REMOVE, payload: c })
//     return dispatch(runSearch())
//   }
// }

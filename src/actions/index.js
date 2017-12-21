/* global fetch, URL */
import * as types from '../actionTypes'

// TODO: remove /api/search?
// import searchAPI from './api/search'
require('isomorphic-fetch')

const defaultAPI = {
  search: searchQuery => {
    return fetch(new URL('/api/search', document.baseURI).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchQuery)
    }).then(response => {
      if (!response.ok) {
        return response.text().then((error) => {
          throw new Error(error)
        })
      }
      return response.json()
    })
  }
}

export const runSearch = (searchQuery, extraArgs = {}) => {
  let searchAPI = defaultAPI
  if (extraArgs.searchAPI) {
    searchAPI = extraArgs.searchAPI
    delete extraArgs.searchAPI
  }
  return (dispatch) => {
    dispatch({
      type: types.SEARCH_REQUESTED,
      payload: {query: searchQuery, ...extraArgs}
    })

    // TODO: send a request directly to middle-tier
    // with query options, queryText, combined query object as object
    return searchAPI.search(searchQuery).then(
      data => dispatch({
        type: types.SEARCH_SUCCESS,
        payload: {response: data.response, ...extraArgs}
      }),
      error => {
        console.warn('Error searching: ', error)
        dispatch({
          type: types.SEARCH_FAILURE,
          payload: {
            error: 'These was an error performing your search. ' + error.message,
            ...extraArgs
          }
        })
      }
    )
  }
}

// export const suggest = (queryText) => {
//   return (dispatch, getState) => {
//     dispatch({ type: types.SUGGEST_REQUESTED, payload: queryText })

//     let state = getState().search
//     let query = qb.ext.combined(constraintQuery(state.constraints), state.queryText)

//     return client.suggest(state.suggestQueryText, query, { options: 'all' })
//       .then(response => {
//         if (!response.ok) throw new Error('bad search')
//         return response.json()
//       })
//       .then(
//         response => dispatch({ type: types.SUGGEST_SUCCESS, payload: response }),
//         response => dispatch({ type: types.SUGGEST_FAILURE, payload: response }),
//       )
//   }
// }

// export const options = () => {
//   return dispatch => {
//     dispatch({ type: types.OPTIONS_REQUESTED })

//     return client.options('all')
//     // !response.ok?
//       .then(response => response.json())
//       .then(response => {
//         if (!(response && response.options)) throw new TypeError('invalid options')
//         return response
//       })
//       .then(
//         response => dispatch({ type: types.OPTIONS_SUCCESS, payload: response }),
//         response => dispatch({ type: types.OPTIONS_FAILURE, payload: response })
//       )
//   }
// }

export const setQueryText = (queryText) => {
  return {
    type: types.SET_QUERYTEXT,
    payload: {queryText}
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

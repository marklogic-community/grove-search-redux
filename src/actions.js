import * as types from './actionTypes';
import { searchSelectors as selectors } from './reducers';
import searchAPI from './api/search';

export const runSearch = (submittedQtext) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.SEARCH_REQUESTED,
      payload: {qtext: submittedQtext}
    });

    let state = getState();
    let qtext = selectors.getExecutedSearchQtext(state);
    let constraints = selectors.getConstraints(state);
    let page = selectors.getPage(state);
    let pageLength = selectors.getPageLength(state);
    let searchProfileName = 'treehouse-options'; // TODO: put in store

    return searchAPI.search({
      qtext,
      constraints,
      page,
      pageLength,
      searchProfileName
    }).then(resp => {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    }).then(
      resp => dispatch({ type: types.SEARCH_SUCCESS, payload: resp }),
      error => dispatch({
        type: types.SEARCH_FAILURE,
        payload: {
          error: 'Search error: ' + error.message
        }
      })
    );
  };
};

// export const suggest = (qtext) => {
//   return (dispatch, getState) => {
//     dispatch({ type: types.SUGGEST_REQUESTED, payload: qtext });

//     let state = getState().search;
//     let query = qb.ext.combined(constraintQuery(state.constraints), state.qtext);

//     return client.suggest(state.suggestQtext, query, { options: 'all' })
//       .then(resp => {
//         if (!resp.ok) throw new Error('bad search');
//         return resp.json();
//       })
//       .then(
//         resp => dispatch({ type: types.SUGGEST_SUCCESS, payload: resp }),
//         resp => dispatch({ type: types.SUGGEST_FAILURE, payload: resp }),
//       );
//   };
// };

// export const options = () => {
//   return dispatch => {
//     dispatch({ type: types.OPTIONS_REQUESTED });

//     return client.options('all')
//     // !resp.ok?
//       .then(resp => resp.json())
//       .then(resp => {
//         if (!(resp && resp.options)) throw new TypeError('invalid options');
//         return resp;
//       })
//       .then(
//         resp => dispatch({ type: types.OPTIONS_SUCCESS, payload: resp }),
//         resp => dispatch({ type: types.OPTIONS_FAILURE, payload: resp })
//       );
//   };
// };

export const setQtext = (qtext) => {
  return {
    type: types.SET_QTEXT,
    payload: {qtext}
  }
};

// export const paginate = (n) => {
//   return dispatch => {
//     dispatch({ type: types.PAGINATE, payload: n });
//     return dispatch(runSearch());
//   };
// };

// export const pageLength = (l) => {
//   return dispatch => {
//     dispatch({ type: types.PAGE_LENGTH, payload: l });
//     return dispatch(runSearch());
//   };
// };

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

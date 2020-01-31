import { combineReducers } from 'redux';
import {
  selectors as stagedSelectors,
  createReducer as createStagedSearch
} from './stagedSearch';
import {
  selectors as executedSelectors,
  createReducer as createExecutedSearch
} from './executedSearch';
import {
  selectors as optionsSelectors,
  createReducer as createOptionsQuery
} from './optionsQuery';

export const createReducer = config => {
  return combineReducers({
    stagedSearch: createStagedSearch(config),
    executedSearch: createExecutedSearch(config),
    options: createOptionsQuery(config)
  });
};

export default createReducer();
// export default (state = initialState, action) => {
//   switch (action.type) {

//     // case types.SUGGEST_REQUESTED:
//     //   return {
//     //     ...state,
//     //     suggestPending: true,
//     //     suggestQueryText: action.payload || ''
//     //   }

//     // case types.SUGGEST_SUCCESS:
//     //   return {
//     //     ...state,
//     //     suggestPending: false,
//     //     // suggestQueryText: '',
//     //     suggestions: action.payload.suggestions || []
//     //   }

//     // case types.SUGGEST_FAILURE:
//     //   return {
//     //     ...state,
//     //     // TODO: put error somewhere
//     //     suggestPending: false,
//     //     // suggestQueryText: '',
//     //     suggestions: []
//     //   }

//     // case types.OPTIONS_REQUESTED:
//     //   return {
//     //     ...state,
//     //     optionsPending: true
//     //   }

// SELECTORS
const bindSelector = (selector, mountPoint) => {
  return (state, ...args) => {
    return selector(state[mountPoint], ...args);
  };
};

const bindSelectors = (selectors, mountPoint) => {
  return Object.keys(selectors).reduce((bound, key) => {
    bound[key] = bindSelector(selectors[key], mountPoint);
    return bound;
  }, {});
};

export const selectors = {
  ...bindSelectors(executedSelectors, 'executedSearch'),
  ...bindSelectors(stagedSelectors, 'stagedSearch'),
  ...bindSelectors(optionsSelectors, 'options')
};

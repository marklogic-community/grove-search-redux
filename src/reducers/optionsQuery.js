import * as bareTypes from '../actionTypes';

export const createReducer = config => {
  let types = bareTypes;
  if (config && config.namespace) {
    types = Object.keys(types).reduce((newTypes, typeKey) => {
      newTypes[typeKey] = config.namespace + '/' + types[typeKey];
      return newTypes;
    }, {});
  }

  return (state = {}, action) => {
    switch (action.type) {
      case types.OPTIONS_REQUESTED:
        return {
          ...state,
          optionsPending: true
        };

      case types.OPTIONS_SUCCESS: {
        let opts = action.payload.options;
        return {
          ...state,
          optionsPending: false,
          options: opts
        };
      }

      case types.OPTIONS_FAILURE:
        return {
          ...state,
          // TODO: put error somewhere
          optionsPending: false,
          options: {}
        };

      default:
        return state;
    }
  };
};

// SELECTORS
export const selectors = {
  // Executed search bookkeeping
  getQueryOptions: state => state,
  getSearchOptions: state => state.options,
  isOptionsPending: state => state.optionsPending
};

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ml-search-redux", [], factory);
	else if(typeof exports === 'object')
		exports["ml-search-redux"] = factory();
	else
		root["ml-search-redux"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_QTEXT = exports.SET_QTEXT = 'search/SET_QTEXT';

var CHANGE_PAGE = exports.CHANGE_PAGE = 'search/CHANGE_PAGE';
var CHANGE_PAGE_LENGTH = exports.CHANGE_PAGE_LENGTH = 'search/CHANGE_PAGE_LENGTH';

var CONSTRAINT_ADD = exports.CONSTRAINT_ADD = 'search/CONSTRAINT_ADD';
var CONSTRAINT_REMOVE = exports.CONSTRAINT_REMOVE = 'search/CONSTRAINT_REMOVE';

var SUGGEST_REQUESTED = exports.SUGGEST_REQUESTED = 'search/SUGGEST_REQUESTED';
var SUGGEST_SUCCESS = exports.SUGGEST_SUCCESS = 'search/SUGGEST_SUCCESS';
var SUGGEST_FAILURE = exports.SUGGEST_FAILURE = 'search/SUGGEST_FAILURE';

var SEARCH_REQUESTED = exports.SEARCH_REQUESTED = 'search/SEARCH_REQUESTED';
var SEARCH_SUCCESS = exports.SEARCH_SUCCESS = 'search/SEARCH_SUCCESS';
var SEARCH_FAILURE = exports.SEARCH_FAILURE = 'search/SEARCH_FAILURE';

var OPTIONS_REQUESTED = exports.OPTIONS_REQUESTED = 'search/OPTIONS_REQUESTED';
var OPTIONS_SUCCESS = exports.OPTIONS_SUCCESS = 'search/OPTIONS_SUCCESS';
var OPTIONS_FAILURE = exports.OPTIONS_FAILURE = 'search/OPTIONS_FAILURE';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchActionTypes = exports.searchActions = exports.searchSelectors = undefined;

var _reducers = __webpack_require__(2);

var _reducers2 = _interopRequireDefault(_reducers);

var _actions = __webpack_require__(3);

var searchActions = _interopRequireWildcard(_actions);

var _actionTypes = __webpack_require__(0);

var searchActionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _reducers2.default; // Public API for the search module

exports.searchSelectors = _reducers.searchSelectors;
exports.searchActions = searchActions;
exports.searchActionTypes = searchActionTypes;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchSelectors = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = __webpack_require__(0);

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Search reducer state shape
 * Using TypeScript format, though not currently evaluated
 *
 * interface ISearchQuery {
 *   qtext:string
 *   page: number,
 *   pageLength: number
 * }
 *
 * interface ISearchResult {
 *   TODO
 * }
 *
 * interface ISearchState {
 *   stagedSearch: ISearchQuery,
 *   executedSearch: {
 *     id: string,
 *     pending: boolean,
 *     response: {
 *       metadata: {
   *       total: number,
   *       executionTime: number,
 *       }
 *       results: Array<ISearchResult>,
 *       facets: {},
 *       error: string
 *     },
 *     query: ISearchQuery
 *   }
 * }
 *
 */

var initialState = {
  // suggestPending: false,
  // optionsPending: false,
  stagedSearch: {
    qtext: '',
    page: 1,
    pageLength: 10
  },
  // suggestQtext: '',
  executedSearch: undefined
  // options: {},
  // suggestions: []


  // TODO: compose stagedSearch and executedSearch composers
};
exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.SET_QTEXT:
      return _extends({}, state, {
        stagedSearch: _extends({}, state.stagedSearch, {
          qtext: action.payload.qtext
        })
      });

    case types.CHANGE_PAGE:
      return _extends({}, state, {
        stagedSearch: _extends({}, state.stagedSearch, {
          page: action.payload.page
        })

        // case types.PAGE_LENGTH:
        //   return {
        //     ...state,
        //     pageLength: action.payload
        //   }

        // case types.CONSTRAINT_ADD: {
        //   let c = action.payload
        //   let constraints = {...state.constraints}
        //   let constraint = constraints[c.name] =  {...constraints[c.name]}
        //   constraint.values = [...(constraint.values || []), c.value]

        //   return {
        //     ...state,
        //     constraints
        //   }
        // }

        // case types.CONSTRAINT_REMOVE: {
        //   let c = action.payload
        //   let constraints = {...state.constraints}
        //   let constraint = constraints[c.name] = {...constraints[c.name]}
        //   if (constraint && constraint.values) {
        //     constraint.values = constraint.values.filter(x => x !== c.value)
        //   }

        //   return {
        //     ...state,
        //     constraints
        //   }
        // }

        // case types.SUGGEST_REQUESTED:
        //   return {
        //     ...state,
        //     suggestPending: true,
        //     suggestQtext: action.payload || ''
        //   }

        // case types.SUGGEST_SUCCESS:
        //   return {
        //     ...state,
        //     suggestPending: false,
        //     // suggestQtext: '',
        //     suggestions: action.payload.suggestions || []
        //   }

        // case types.SUGGEST_FAILURE:
        //   return {
        //     ...state,
        //     // TODO: put error somewhere
        //     suggestPending: false,
        //     // suggestQtext: '',
        //     suggestions: []
        //   }

      });case types.SEARCH_REQUESTED:
      return _extends({}, state, {
        executedSearch: {
          id: Math.random().toString().substr(2, 10),
          pending: true,
          response: {
            results: [],
            // facets: {},
            error: undefined
          },
          // TODO: Now we are accessing stagedSearch to do this
          // This prevents us from breaking up this reducer.
          // Should we instead require that the search be part of the payload?
          query: _extends({}, state.stagedSearch)
        }
      });

    case types.SEARCH_SUCCESS:
      {
        var response = action.payload;
        return _extends({}, state, {
          executedSearch: _extends({}, state.executedSearch, {
            pending: false,
            response: {
              results: response.results,
              total: response.total,
              // facets: response.facets,
              executionTime: response.executionTime
            }
            // suggestQtext: '',
          }) });
      }

    case types.SEARCH_FAILURE:
      return _extends({}, state, {
        executedSearch: _extends({}, state.executedSearch, {
          pending: false,
          response: _extends({}, state.executedSearch.response, {
            error: action.payload && action.payload.error
          })
          // suggestQtext: '',
        })

        // case types.OPTIONS_REQUESTED:
        //   return {
        //     ...state,
        //     optionsPending: true
        //   }

        // case types.OPTIONS_SUCCESS: {
        //   let opts = action.payload.options
        //   let constraints = {}
        //   opts.constraint.forEach(c => constraints[c.name] = c)
        //   return {
        //     ...state,
        //     optionsPending: false,
        //     // TODO: merge values?
        //     constraints: constraints,
        //     options: opts
        //   }
        // }

        // case types.OPTIONS_FAILURE:
        //   return {
        //     ...state,
        //     // TODO: put error somewhere
        //     optionsPending: false,
        //     options: {}
        //   }

      });default:
      return state;
  }
};

var getStagedQuery = function getStagedQuery(state) {
  return state.stagedSearch;
};

var getExecutedSearch = function getExecutedSearch(state) {
  return state.executedSearch;
};
var getExecutedSearchQuery = function getExecutedSearchQuery(state) {
  var search = getExecutedSearch(state);
  return search && search.query;
};
var getSearchResponse = function getSearchResponse(state) {
  var search = getExecutedSearch(state);
  return search && search.response;
};

var getFromExecutedSearch = function getFromExecutedSearch(state, propertyName) {
  var search = getExecutedSearch(state);
  return search && search[propertyName];
};
var getFromExecutedSearchQuery = function getFromExecutedSearchQuery(state, propertyName) {
  var query = getExecutedSearchQuery(state);
  return query && query[propertyName];
};
var getFromSearchResponse = function getFromSearchResponse(state, propertyName) {
  var response = getSearchResponse(state);
  return response && response[propertyName];
};

var getSearchTotal = function getSearchTotal(state) {
  return getFromSearchResponse(state, 'total');
};

var getPageLength = function getPageLength(state) {
  return getFromExecutedSearchQuery(state, 'pageLength');
};
var isSearchPending = function isSearchPending(state) {
  return getFromExecutedSearch(state, 'pending');
};

var searchSelectors = exports.searchSelectors = {
  // From stagedSearch
  getStagedQuery: getStagedQuery,
  getVisibleQtext: function getVisibleQtext(state) {
    return getStagedQuery(state).qtext;
  },

  // Executed search bookkeeping
  getExecutedSearch: getExecutedSearch,
  getExecutedSearchId: function getExecutedSearchId(state) {
    return getExecutedSearch(state).id;
  },
  isSearchPending: isSearchPending,

  // From executed search query
  getExecutedSearchQuery: getExecutedSearchQuery,
  // getConstraints: state => getExecutedSearchQuery(state).constraints,
  getPage: function getPage(state) {
    return getFromExecutedSearchQuery(state, 'page');
  },
  getPageLength: getPageLength,
  getExecutedSearchQtext: function getExecutedSearchQtext(state) {
    return getFromExecutedSearchQuery(state, 'qtext');
  },

  // From search response
  // getSearchResponse: getSearchResponse,
  getSearchResults: function getSearchResults(state) {
    return getFromSearchResponse(state, 'results');
  },
  getSearchTotal: getSearchTotal,
  getSearchExecutionTime: function getSearchExecutionTime(state) {
    return getFromSearchResponse(state, 'executionTime');
  },
  getError: function getError(state) {
    return getFromSearchResponse(state, 'error');
  },

  // Calculated
  getSearchTotalPages: function getSearchTotalPages(state) {
    return Math.ceil(getSearchTotal(state) / getPageLength(state));
  },
  // TODO: test
  isSearchComplete: function isSearchComplete(state) {
    return getExecutedSearch(state) && !isSearchPending(state);
  }

};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePage = exports.setQtext = exports.runSearch = undefined;

var _actionTypes = __webpack_require__(0);

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// TODO: remove /api/search?
// import searchAPI from './api/search'
__webpack_require__(4); /* global fetch, URL */
var runSearch = exports.runSearch = function runSearch(searchQuery) {
  return function (dispatch, getState) {
    dispatch({
      type: types.SEARCH_REQUESTED,
      payload: { query: searchQuery }
    });

    // TODO: send a request directly to middle-tier
    // with query options, qtext, combined query object as object
    return fetch(new URL('/api/search', document.baseURI).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchQuery)
    }).then(function (resp) {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    }).then(function (resp) {
      return dispatch({ type: types.SEARCH_SUCCESS, payload: resp });
    }, function (error) {
      return dispatch({
        type: types.SEARCH_FAILURE,
        payload: {
          error: 'Search error: ' + error.message
        }
      });
    });
  };
};

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

var setQtext = exports.setQtext = function setQtext(qtext) {
  return {
    type: types.SET_QTEXT,
    payload: { qtext: qtext }
  };
};

var changePage = exports.changePage = function changePage(n) {
  return { type: types.CHANGE_PAGE, payload: { page: n } };
};

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(5);
module.exports = self.fetch.bind(self);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (typeof input === 'string') {
      this.url = input
    } else {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split('\r\n').forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ })
/******/ ]);
});
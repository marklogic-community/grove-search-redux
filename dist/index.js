!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("muir-search-redux",[],t):"object"==typeof exports?exports["muir-search-redux"]=t():e["muir-search-redux"]=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=9)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SET_QUERYTEXT="search/SET_QUERYTEXT",t.CHANGE_PAGE="search/CHANGE_PAGE",t.CHANGE_PAGE_LENGTH="search/CHANGE_PAGE_LENGTH",t.FILTER_ADD="search/FILTER_ADD",t.FILTER_REMOVE="search/FILTER_REMOVE",t.SUGGEST_REQUESTED="search/SUGGEST_REQUESTED",t.SUGGEST_SUCCESS="search/SUGGEST_SUCCESS",t.SUGGEST_FAILURE="search/SUGGEST_FAILURE",t.SEARCH_REQUESTED="search/SEARCH_REQUESTED",t.SEARCH_SUCCESS="search/SEARCH_SUCCESS",t.SEARCH_FAILURE="search/SEARCH_FAILURE",t.CLEAR_SEARCH_RESULTS="search/CLEAR_SEARCH_RESULTS",t.OPTIONS_REQUESTED="search/OPTIONS_REQUESTED",t.OPTIONS_SUCCESS="search/OPTIONS_SUCCESS",t.OPTIONS_FAILURE="search/OPTIONS_FAILURE"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(2),o=r(23),i=r(24),a=r(25),u=r(7);r(6);r.d(t,"createStore",function(){return n.b}),r.d(t,"combineReducers",function(){return o.a}),r.d(t,"bindActionCreators",function(){return i.a}),r.d(t,"applyMiddleware",function(){return a.a}),r.d(t,"compose",function(){return u.a})},function(e,t,r){"use strict";function n(e,t,r){function i(){v===b&&(v=b.slice())}function c(){return y}function s(e){if("function"!=typeof e)throw new Error("Expected listener to be a function.");var t=!0;return i(),v.push(e),function(){if(t){t=!1,i();var r=v.indexOf(e);v.splice(r,1)}}}function f(e){if(!Object(o.a)(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(E)throw new Error("Reducers may not dispatch actions.");try{E=!0,y=h(y,e)}finally{E=!1}for(var t=b=v,r=0;r<t.length;r++){(0,t[r])()}return e}function d(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");h=e,f({type:u.INIT})}function l(){var e,t=s;return e={subscribe:function(e){function r(){e.next&&e.next(c())}if("object"!=typeof e)throw new TypeError("Expected the observer to be an object.");return r(),{unsubscribe:t(r)}}},e[a.a]=function(){return this},e}var p;if("function"==typeof t&&void 0===r&&(r=t,t=void 0),void 0!==r){if("function"!=typeof r)throw new Error("Expected the enhancer to be a function.");return r(n)(e,t)}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var h=e,y=t,b=[],v=b,E=!1;return f({type:u.INIT}),p={dispatch:f,subscribe:s,getState:c,replaceReducer:d},p[a.a]=l,p}r.d(t,"a",function(){return u}),t.b=n;var o=r(3),i=r(19),a=r.n(i),u={INIT:"@@redux/INIT"}},function(e,t,r){"use strict";function n(e){if(!Object(a.a)(e)||Object(o.a)(e)!=u)return!1;var t=Object(i.a)(e);if(null===t)return!0;var r=d.call(t,"constructor")&&t.constructor;return"function"==typeof r&&r instanceof r&&f.call(r)==l}var o=r(11),i=r(16),a=r(18),u="[object Object]",c=Function.prototype,s=Object.prototype,f=c.toString,d=s.hasOwnProperty,l=f.call(Object);t.a=n},function(e,t,r){"use strict";var n=r(12),o=n.a.Symbol;t.a=o},function(e,t){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){"use strict"},function(e,t,r){"use strict";function n(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})}t.a=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.selectors=t.createReducer=void 0;var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=r(0),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(o),a=(t.createReducer=function(e){var t=i;return e&&e.namespace&&(t=Object.keys(t).reduce(function(r,n){return r[n]=e.namespace+"/"+t[n],r},{})),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments[1];switch(r.type){case t.SEARCH_REQUESTED:return n({},e,{id:Math.random().toString().substr(2,10),pending:!0,query:n({},r.payload.query)});case t.SEARCH_SUCCESS:var o=r.payload.response,i=o.metrics&&o.metrics["total-time"];return i&&(i=parseFloat(i.replace(/^PT/,"").replace(/S$/,""))),n({},e,{pending:!1,response:{results:o.results,facets:o.facets,metadata:{executionTime:i}}});case t.SEARCH_FAILURE:return n({},e,{pending:!1,response:n({},e.response,{error:r.payload&&r.payload.error})});case t.CLEAR_SEARCH_RESULTS:return{};default:return e}}},function(e){return e&&e.query}),u=function(e){return e&&e.response},c=function(e,t){return e&&e[t]},s=function(e,t){var r=a(e);return r&&r[t]},f=function(e,t){var r=u(e);return r&&r[t]},d=function(e,t){var r=f(e,"metadata");return r&&r[t]},l=function(e){return d(e,"total")},p=function(e){return s(e,"pageLength")},h=function(e){return c(e,"pending")||!1};t.selectors={getExecutedSearch:function(e){return e},getExecutedSearchId:function(e){return e.id},isSearchPending:h,getExecutedSearchQuery:a,getPage:function(e){return s(e,"page")},getPageLength:p,getExecutedSearchQueryText:function(e){return s(e,"queryText")},getSearchResults:function(e){return f(e,"results")||[]},searchFacets:function(e){return f(e,"facets")},getSearchTotal:l,getSearchExecutionTime:function(e){return d(e,"executionTime")},getSearchError:function(e){return f(e,"error")},getSearchTotalPages:function(e){return Math.ceil(l(e)/p(e))},isSearchComplete:function(e){return e.response&&!h(e)}}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.executedSearchSelectors=t.createExecutedSearchReducer=t.actionTypes=t.actions=t.selectors=t.createActions=t.createReducer=void 0;var o=r(10),i=n(o),a=r(27),u=n(a),c=r(0),s=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(c),f=r(8),d=(0,u.default)();t.default=i.default,t.createReducer=o.createReducer,t.createActions=u.default,t.selectors=o.selectors,t.actions=d,t.actionTypes=s,t.createExecutedSearchReducer=f.createReducer,t.executedSearchSelectors=f.selectors},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.selectors=t.createReducer=void 0;var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=r(1),i=r(26),a=r(8),u=t.createReducer=function(e){return(0,o.combineReducers)({stagedSearch:(0,i.createReducer)(e),executedSearch:(0,a.createReducer)(e)})};t.default=u();var c=function(e,t){return function(r){for(var n=arguments.length,o=Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];return e.apply(void 0,[r[t]].concat(o))}},s=function(e,t){return Object.keys(e).reduce(function(r,n){return r[n]=c(e[n],t),r},{})};t.selectors=n({},s(a.selectors,"executedSearch"),s(i.selectors,"stagedSearch"))},function(e,t,r){"use strict";function n(e){return null==e?void 0===e?c:u:s&&s in Object(e)?Object(i.a)(e):Object(a.a)(e)}var o=r(4),i=r(14),a=r(15),u="[object Null]",c="[object Undefined]",s=o.a?o.a.toStringTag:void 0;t.a=n},function(e,t,r){"use strict";var n=r(13),o="object"==typeof self&&self&&self.Object===Object&&self,i=n.a||o||Function("return this")();t.a=i},function(e,t,r){"use strict";(function(e){var r="object"==typeof e&&e&&e.Object===Object&&e;t.a=r}).call(t,r(5))},function(e,t,r){"use strict";function n(e){var t=a.call(e,c),r=e[c];try{e[c]=void 0;var n=!0}catch(e){}var o=u.call(e);return n&&(t?e[c]=r:delete e[c]),o}var o=r(4),i=Object.prototype,a=i.hasOwnProperty,u=i.toString,c=o.a?o.a.toStringTag:void 0;t.a=n},function(e,t,r){"use strict";function n(e){return i.call(e)}var o=Object.prototype,i=o.toString;t.a=n},function(e,t,r){"use strict";var n=r(17),o=Object(n.a)(Object.getPrototypeOf,Object);t.a=o},function(e,t,r){"use strict";function n(e,t){return function(r){return e(t(r))}}t.a=n},function(e,t,r){"use strict";function n(e){return null!=e&&"object"==typeof e}t.a=n},function(e,t,r){e.exports=r(20)},function(e,t,r){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0});var o,i=r(22),a=function(e){return e&&e.__esModule?e:{default:e}}(i);o="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:n;var u=(0,a.default)(o);t.default=u}).call(t,r(5),r(21)(e))},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t,r){"use strict";function n(e){var t,r=e.Symbol;return"function"==typeof r?r.observable?t=r.observable:(t=r("observable"),r.observable=t):t="@@observable",t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},function(e,t,r){"use strict";function n(e,t){var r=t&&t.type;return"Given action "+(r&&'"'+r.toString()+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}function o(e){Object.keys(e).forEach(function(t){var r=e[t];if(void 0===r(void 0,{type:a.a.INIT}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===r(void 0,{type:"@@redux/PROBE_UNKNOWN_ACTION_"+Math.random().toString(36).substring(7).split("").join(".")}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+a.a.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')})}function i(e){for(var t=Object.keys(e),r={},i=0;i<t.length;i++){var a=t[i];"function"==typeof e[a]&&(r[a]=e[a])}var u=Object.keys(r),c=void 0;try{o(r)}catch(e){c=e}return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];if(c)throw c;for(var o=!1,i={},a=0;a<u.length;a++){var s=u[a],f=r[s],d=e[s],l=f(d,t);if(void 0===l){var p=n(s,t);throw new Error(p)}i[s]=l,o=o||l!==d}return o?i:e}}t.a=i;var a=r(2);r(3),r(6)},function(e,t,r){"use strict";function n(e,t){return function(){return t(e.apply(void 0,arguments))}}function o(e,t){if("function"==typeof e)return n(e,t);if("object"!=typeof e||null===e)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===e?"null":typeof e)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');for(var r=Object.keys(e),o={},i=0;i<r.length;i++){var a=r[i],u=e[a];"function"==typeof u&&(o[a]=n(u,t))}return o}t.a=o},function(e,t,r){"use strict";function n(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return function(r,n,a){var u=e(r,n,a),c=u.dispatch,s=[],f={getState:u.getState,dispatch:function(e){return c(e)}};return s=t.map(function(e){return e(f)}),c=o.a.apply(void 0,s)(u.dispatch),i({},u,{dispatch:c})}}}t.a=n;var o=r(7),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}},function(e,t,r){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.selectors=t.createReducer=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=r(1),a=r(0),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(a);t.createReducer=function(e){var t=u;e&&e.namespace&&(t=Object.keys(t).reduce(function(r,n){return r[n]=e.namespace+"/"+t[n],r},{}));var r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments[1];switch(r.type){case t.SET_QUERYTEXT:return r.payload.queryText;default:return e}},a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,r=arguments[1];switch(r.type){case t.CHANGE_PAGE:return r.payload.page;default:return e}},c=function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:10},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],r=arguments[1],i=void 0,a=void 0;switch(r.type){case t.FILTER_ADD:i=r.payload.constraint,a=r.payload.boolean;var u=e.find(function(e){return e.constraint===i&&e.mode===a});return u?e.map(function(e){return e===u?o({},e,{value:[].concat(n(e.value),[r.payload.value])}):e}):[].concat(n(e),[{constraint:i,mode:a,type:"selection",value:[r.payload.value]}]);case t.FILTER_REMOVE:return i=r.payload.constraint,a=r.payload.boolean,e.reduce(function(e,t){if(t.constraint===i&&t.mode===a){var u=t.value.filter(function(e){return e!==r.payload.value});return 0===u.length?e:[].concat(n(e),[o({},t,{value:u})])}return[].concat(n(e),[t])},[]);default:return e}};return(0,i.combineReducers)({queryText:r,page:a,pageLength:c,filters:s})},t.selectors={getStagedQuery:function(e){return e},getVisibleQueryText:function(e){return e.queryText},stagedFilters:function(e){return e.filters}}},function(e,t,r){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=r(0),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(i);r(28);var u={search:function(e){return fetch(new URL("/api/search/all",document.baseURI).toString(),{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify(o({},e,{queryText:void 0,filters:{and:[{type:"queryText",value:e.queryText}].concat(n(e.filters||[]))}}))}).then(function(e){return e.ok?e.json():e.json().then(function(e){throw new Error(e.message)})})}};t.default=function(e){var t=a;e&&e.namespace&&(t=Object.keys(t).reduce(function(r,n){return r[n]=e.namespace+"/"+t[n],r},{}));var r=function(e,r){return{type:t.SEARCH_SUCCESS,payload:o({response:e},r)}};return{runSearch:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=u;return n.api&&(i=n.api,delete n.api),function(a){return a({type:t.SEARCH_REQUESTED,payload:o({query:e},n)}),i.search(e,n).then(function(e){return a(r(e,n))},function(e){a({type:t.SEARCH_FAILURE,payload:o({error:e.message},n)})})}},receiveSuccessfulSearch:r,clearSearchResults:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{type:t.CLEAR_SEARCH_RESULTS,payload:o({},e)}},setQueryText:function(e){return{type:t.SET_QUERYTEXT,payload:{queryText:e}}},changePage:function(e){return{type:t.CHANGE_PAGE,payload:{page:e}}},addFilter:function(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return{type:t.FILTER_ADD,payload:{constraint:e,value:r,boolean:n.boolean||"and"}}},removeFilter:function(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return{type:t.FILTER_REMOVE,payload:{constraint:e,value:r,boolean:n.boolean||"and"}}}}}},function(e,t,r){r(29),e.exports=self.fetch.bind(self)},function(e,t){!function(e){"use strict";function t(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function r(e){return"string"!=typeof e&&(e=String(e)),e}function n(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return v.iterable&&(t[Symbol.iterator]=function(){return t}),t}function o(e){this.map={},e instanceof o?e.forEach(function(e,t){this.append(t,e)},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function i(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function a(e){return new Promise(function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}})}function u(e){var t=new FileReader,r=a(t);return t.readAsArrayBuffer(e),r}function c(e){var t=new FileReader,r=a(t);return t.readAsText(e),r}function s(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}function f(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function d(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e,e)if("string"==typeof e)this._bodyText=e;else if(v.blob&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(v.formData&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(v.searchParams&&URLSearchParams.prototype.isPrototypeOf(e))this._bodyText=e.toString();else if(v.arrayBuffer&&v.blob&&S(e))this._bodyArrayBuffer=f(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!v.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(e)&&!m(e))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=f(e)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):v.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},v.blob&&(this.blob=function(){var e=i(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?i(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(u)}),this.text=function(){var e=i(this);if(e)return e;if(this._bodyBlob)return c(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(s(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},v.formData&&(this.formData=function(){return this.text().then(h)}),this.json=function(){return this.text().then(JSON.parse)},this}function l(e){var t=e.toUpperCase();return _.indexOf(t)>-1?t:e}function p(e,t){t=t||{};var r=t.body;if("string"==typeof e)this.url=e;else{if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new o(e.headers)),this.method=e.method,this.mode=e.mode,r||null==e._bodyInit||(r=e._bodyInit,e.bodyUsed=!0)}if(this.credentials=t.credentials||this.credentials||"omit",!t.headers&&this.headers||(this.headers=new o(t.headers)),this.method=l(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function h(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(o))}}),t}function y(e){var t=new o;return e.split("\r\n").forEach(function(e){var r=e.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();t.append(n,o)}}),t}function b(e,t){t||(t={}),this.type="default",this.status="status"in t?t.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new o(t.headers),this.url=t.url||"",this._initBody(e)}if(!e.fetch){var v={searchParams:"URLSearchParams"in e,iterable:"Symbol"in e&&"iterator"in Symbol,blob:"FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};if(v.arrayBuffer)var E=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],S=function(e){return e&&DataView.prototype.isPrototypeOf(e)},m=ArrayBuffer.isView||function(e){return e&&E.indexOf(Object.prototype.toString.call(e))>-1};o.prototype.append=function(e,n){e=t(e),n=r(n);var o=this.map[e];o||(o=[],this.map[e]=o),o.push(n)},o.prototype.delete=function(e){delete this.map[t(e)]},o.prototype.get=function(e){var r=this.map[t(e)];return r?r[0]:null},o.prototype.getAll=function(e){return this.map[t(e)]||[]},o.prototype.has=function(e){return this.map.hasOwnProperty(t(e))},o.prototype.set=function(e,n){this.map[t(e)]=[r(n)]},o.prototype.forEach=function(e,t){Object.getOwnPropertyNames(this.map).forEach(function(r){this.map[r].forEach(function(n){e.call(t,n,r,this)},this)},this)},o.prototype.keys=function(){var e=[];return this.forEach(function(t,r){e.push(r)}),n(e)},o.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),n(e)},o.prototype.entries=function(){var e=[];return this.forEach(function(t,r){e.push([r,t])}),n(e)},v.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var _=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];p.prototype.clone=function(){return new p(this,{body:this._bodyInit})},d.call(p.prototype),d.call(b.prototype),b.prototype.clone=function(){return new b(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},b.error=function(){var e=new b(null,{status:0,statusText:""});return e.type="error",e};var g=[301,302,303,307,308];b.redirect=function(e,t){if(-1===g.indexOf(t))throw new RangeError("Invalid status code");return new b(null,{status:t,headers:{location:e}})},e.Headers=o,e.Request=p,e.Response=b,e.fetch=function(e,t){return new Promise(function(r,n){var o=new p(e,t),i=new XMLHttpRequest;i.onload=function(){var e={status:i.status,statusText:i.statusText,headers:y(i.getAllResponseHeaders()||"")};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var t="response"in i?i.response:i.responseText;r(new b(t,e))},i.onerror=function(){n(new TypeError("Network request failed"))},i.ontimeout=function(){n(new TypeError("Network request failed"))},i.open(o.method,o.url,!0),"include"===o.credentials&&(i.withCredentials=!0),"responseType"in i&&v.blob&&(i.responseType="blob"),o.headers.forEach(function(e,t){i.setRequestHeader(t,e)}),i.send(void 0===o._bodyInit?null:o._bodyInit)})},e.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)}])});
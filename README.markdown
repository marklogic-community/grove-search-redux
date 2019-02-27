# MarkLogic Search Implemented in Redux

This is a Redux implementation of search. It forms part of the MarkLogic Grove project. It works well for search against MarkLogic, but any backend search system could be used, so long as a middle-tier marshalled the response into the shape specified by the [Grove Core API](https://project.marklogic.com/repo/users/gjosten/repos/grove-core-api/browse). See the [Grove React-Redux Template](https://project.marklogic.com/repo/projects/NACW/repos/grove-react-template/browse) for an example of using this library in practice.

## Install

    npm install grove-search-redux --save

## Use

### Simple Use

In many cases, you will consume this library as part of a Grove Template, such as the [Grove React-Redux Template](https://project.marklogic.com/repo/projects/NACW/repos/grove-react-template/browse). The ui library in those templates, in turn, consume this library via the [grove-core-react-redux-containers library](https://project.marklogic.com/repo/users/pmcelwee/repos/grove-core-react-redux-containers/browse), which connects together React components with Redux modules like this one.

But the actions and selectors exposed by this library should also be passed along via grove-core-react-redux-containers's `<SearchContainer>`.

[See the grove-core-api for more information about Grove search filters.](https://project.marklogic.com/repo/users/gjosten/repos/grove-core-api/browse)

### Available Actions

- `runSearch(query)`. Runs a search based on the passed query. The query will most often be obtained by calling `selectors.getStagedQuery(state)`.
- `receiveSuccessfulSearch(response, optionalArgs)`. This action will not often be used, but could be used to provide a search response directly, without invoking `runSearch()`.
- `setQueryText(queryText)`. This sets a queryText filter in the staged search query.
- `changePage(pageNumber)`. Changes the page in the staged search query.

#### Filter Actions

#### Lower-Level Actions

These actions are lower-level actions that may allow a custom use of Grove search filters. We recommend using the actions above instead, because they provide validation that the provided options match what is expected by a given filter type.

- `addFilter(filterOptions)`. Adds or appends to a filter with a matching `filterOptions.constraint` and `filterOptions.mode`. The following `filterOptions` are supported, though others could be passed and will attach to the resulting filter [TODO: test that].

  | Option           | Req? | Default                                                          | Accepts                 | Examples                                                      |
  | ---              | ---  | ---                                                              | ---                     | ---                                                           |
  | `constraint`     | yes  | `undefined`                                                      | string                  | 'myFacet'                                                     |
  | `values`         | yes  | `undefined`                                                      | string, object<br>array | 'red'<br>['red', 'blue']<br>{ 'ge': 10, 'lt': 20 }            |
  | `filterType`     | no   | 'selection'                                                      | string                  | 'range'<br>'querytext'<br>'custom'                            |
  | `mode`           | no   | 'and' when `filterType === 'selection'`<br>`undefined` otherwise | string                  | 'or'<br>'not'                                                 |
  | `constraintType` | no   | `undefined`                                                      | string                  | 'collection'<br>'geospatial'<br>'custom'<br>'word'<br>'value' |

- `replaceFilter(filterOptions)`: This will by default add or replace all values for the filter in the staged search query matching the given `filterOptions.constraint` and `filterOptions.mode`. The following `filterOptions` are supported, though others could be passed and will attach to the resulting filter [TODO: test that]. If the filter already exists, this method will only replace the values and any other `filterOptions` that are provided [TODO: test that].

  | Option           | Req? | Default                                                          | Accepts                 | Examples                                                      |
  | ---              | ---  | ---                                                              | ---                     | ---                                                           |
  | `constraint`     | yes  | `undefined`                                                      | string                  | 'myFacet'                                                     |
  | `values`         | yes  | `undefined`                                                      | string, object<br>array | 'red'<br>['red', 'blue']<br>{ 'ge': 10, 'lt': 20 }            |
  | `filterType`     | no   | 'selection'                                                      | string                  | 'range'<br>'querytext'<br>'custom'                            |
  | `mode`           | no   | 'and' when `filterType === 'selection'`<br>`undefined` otherwise | string                  | 'or'<br>'not'                                                 |
  | `constraintType` | no   | `undefined`                                                      | string                  | 'collection'<br>'geospatial'<br>'custom'<br>'word'<br>'value' |

- `removeFilter(filterOptions)`. This will by default remove any filter values matching a value in `filterOptions.values` from the filter in the staged search query matching the given `filterOptions.constraint` and `filterOptions.mode`. The following `filterOptions` are supported:

  | Option       | Req? | Default                                                          | Accepts                 | Examples                                           |
  | ---          | ---  | ---                                                              | ---                     | ---                                                |
  | `constraint` | yes  | `undefined`                                                      | string                  | 'myFacet'                                          |
  | `values`     | yes  | `undefined`                                                      | string, object<br>array | 'red'<br>['red', 'blue']<br>{ 'ge': 10, 'lt': 20 } |
  | `mode`       | no   | 'and' when `filterType === 'selection'`<br>`undefined` otherwise | string                  | 'or'<br>'not'                                      |

- `clearFilter(constraint)`. This clears all filters for a given constraint in the staged search query.

### Available Selectors

- Selectors getting information about the **staged** search:
  - `getStagedQuery(state)`. Returns the currently staged query, as serialized in this Redux module and POSTed to a Grove middle-tier.
  - `stagedFilters(state)`. Returns all currently staged filters, as serialized in this Redux module and POSTed to a Grove middle-tier.
  - TODO: more, see `src/reducers/stagedSearch.js`
- Selectors getting information about the **executed** search:
  - `getPage(state)`. Returns the page of the executed search query.
  - `getPageLength(state)`. Returns the page length of the executed search query.
  - TODO: more, see `src/reducers/executedSearch.js`

### Advanced Use Cases

The provided selectors only know about their slice of state, so your consuming code needs to wrap them to provide their particular slice of state. For example:

```javascript
import {
  actions as searchActions,
  selectors as searchSelectors
} from 'grove-search-redux';

const bindSelector = (selector, mountPoint) => {
  return (state, ...args) => {
    return selector(state[mountPoint], ...args)
  }
}
const bindSelectors = (selectors, mountPoint) => {
  return Object.keys(selectors).reduce((bound, key) => {
    bound[key] = bindSelector(selectors[key], mountPoint)
    return bound
  }, {})
}

const boundSearchSelectors = bindSelectors(searchSelectors, 'search');
```

A version of the `bindSelectors()` function is available as an export from the `grove-core-react-redux-containers` library, in case you are already using it.

Also, you will need to provide a searchQuery to the `runSearch` action. This is done for you already if you are using the default ML-Treehouse React components. In other cases, this can be done with something like:

```javascript
import { searchActions } from 'grove-search-redux';

// Using `wrappedSearchSelectors` from the code above
// `state` imported most likely using the React-Redux Provider
searchActions.runSearch(wrappedSearchSelectors.getStagedQuery(state));
```

## 'Ducks' architecture

This roughly follows [the architecture laid out in the re-ducks proposal]( https://github.com/alexnm/re-ducks/blob/f28ecc59d43542b8353948ede0cd3a059ca177dd/README.md):

Specifically, the actionCreators and selectors are the primary external UI. State and reducers should be an implementation detail.

## Contributing

You will need to install the devDependencies:

    npm install

### Building

This project uses [Webpack](https://webpack.js.org/) for building.

    npm run build

### Testing

This project uses [Jest](https://facebook.github.io/jest/) for testing.

    npm test

Or, if you want it to watch for file changes and automatically re-run the tests:

    npm run test:watch

### Linting

This project uses the [Javascript Standard Style](https://standardjs.com/). It will be checked automatically when you run tests, but you will have a greatly improved experience if you [install an ESLint checker in your text editor](https://eslint.org/docs/user-guide/integrations#editors), so linting errors are highlighted immediately.

# MarkLogic Search Implemented in Redux

This is a Redux implementation of MarkLogic search, for use in proving that
such Redux modules can be made to work with React, Vue.js, and Angular 2+. This was created as part of the MarkLogic Treehouse project.

## Install

    npm install ml-search-redux --save

TODO: more about how to integrate into Redux app

## Use

The provided selectors only know about their slice of state, so your consuming code needs to wrap them to provide their particular slice of state. For example:

```javascript
import { searchActions, searchSelectors } from 'ml-search-redux';

const wrappedSearchSelectors = Object.keys(searchSelectors).reduce(
  (newSelectors, name) => {
    newSelectors[name] = state => searchSelectors[name](state.search)
    return newSelectors;
  },
  {}
);
```

Also, you will need to provide a searchQuery to the `runSearch` action. This is done for you already if you are using the default ML-Treehouse React components. In other cases, this can be done with something like:

```javascript
import { searchActions } from 'ml-search-redux';

// Using `wrappedSearchSelectors` from the code above
// `state` imported most likely using the React-Redux Provider
searchActions.runSearch(wrappedSearchSelectors.getPreExecutedQuery(state));
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

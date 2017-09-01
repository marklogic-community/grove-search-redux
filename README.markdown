This is a Redux implementation of MarkLogic search, for use in proving that
such Redux modules can be made to work with React, Vue.js, and Angular 2+.

## 'Ducks' architecture

This roughly follows the architecture laid out here: https://github.com/alexnm/re-ducks/blob/f28ecc59d43542b8353948ede0cd3a059ca177dd/README.md

Specifically, the actionCreators and selectors are the primary external UI. State and reducers should be an implementation detail.

## Building

    npm run build

## Testing

TODO

/* eslint-env jest */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer, { actions, selectors } from './index';

describe('filter actions', () => {
  let store;
  beforeEach(() => {
    store = createStore(reducer, applyMiddleware(thunk));
  });

  describe('low-level filter actions', () => {
    it('manages filters', () => {
      expect(selectors.stagedFilters(store.getState())).toEqual([]);
      store.dispatch(
        actions.addFilter({
          constraint: 'eyeColor',
          values: 'blue'
        })
      );
      // defaults to "selection" type and "and" mode
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'eyeColor',
          mode: 'and',
          value: ['blue']
        }
      ]);
      // append all values in values array to filter
      store.dispatch(
        actions.addFilter({ constraint: 'eyeColor', values: ['brown', 'red'] })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'eyeColor',
          mode: 'and',
          value: ['blue', 'brown', 'red']
        }
      ]);
      store.dispatch(
        actions.removeFilter({ constraint: 'eyeColor', values: 'brown' })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'eyeColor',
          mode: 'and',
          value: ['blue', 'red']
        }
      ]);
      store.dispatch(
        actions.addFilter({ constraint: 'gender', values: 'female' })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'eyeColor',
          mode: 'and',
          value: ['blue', 'red']
        },
        {
          type: 'selection',
          constraint: 'gender',
          mode: 'and',
          value: ['female']
        }
      ]);
      store.dispatch(
        actions.removeFilter({
          constraint: 'eyeColor',
          values: ['blue', 'red']
        })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'gender',
          mode: 'and',
          value: ['female']
        }
      ]);
    });

    it('manages filters with object values', () => {
      const box1 = {
        south: 38,
        north: 42,
        east: 10,
        west: 20
      };
      const box2 = {
        south: -38,
        north: -42,
        east: -10,
        west: -20
      };
      // TODO: add action-level tests for selection, with geospatial type
      store.dispatch(
        actions.addFilter({
          constraint: 'location',
          constraintType: 'geospatial',
          values: box1
        })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'location',
          constraintType: 'geospatial',
          mode: 'and',
          value: [box1]
        }
      ]);
      store.dispatch(
        actions.addFilter({ constraint: 'location', values: box2 })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'location',
          constraintType: 'geospatial',
          mode: 'and',
          value: [box1, box2]
        }
      ]);
      store.dispatch(
        actions.removeFilter({ constraint: 'location', values: { ...box1 } })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'location',
          constraintType: 'geospatial',
          mode: 'and',
          value: [box2]
        }
      ]);
    });

    it('clears filters based on constraint', () => {
      store.dispatch(
        actions.addFilter({ constraint: 'eyeColor', values: 'blue' })
      );
      store.dispatch(
        actions.addFilter({ constraint: 'eyeColor', values: 'brown' })
      );
      store.dispatch(actions.clearFilter('eyeColor'));
      expect(selectors.stagedFilters(store.getState())).toEqual([]);
    });

    it('replaces filters based on constraint and mode', () => {
      store.dispatch(
        actions.addFilter({ constraint: 'eyeColor', values: ['blue', 'brown'] })
      );
      store.dispatch(
        actions.addFilter({
          constraint: 'eyeColor',
          values: 'or-color',
          mode: 'or'
        })
      );
      store.dispatch(
        actions.replaceFilter({ constraint: 'eyeColor', values: ['orange'] })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'eyeColor',
          mode: 'and',
          value: ['orange']
        },
        {
          type: 'selection',
          constraint: 'eyeColor',
          mode: 'or',
          value: ['or-color']
        }
      ]);
      store.dispatch(
        actions.replaceFilter({
          constraint: 'eyeColor',
          values: ['green', 'red'],
          mode: 'or'
        })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'eyeColor',
          mode: 'and',
          value: ['orange']
        },
        {
          type: 'selection',
          constraint: 'eyeColor',
          mode: 'or',
          value: ['green', 'red']
        }
      ]);
    });

    it('manages ORed filters', () => {
      store.dispatch(
        actions.addFilter({
          constraint: 'eyeColor',
          values: 'blue',
          mode: 'or'
        })
      );
      store.dispatch(
        actions.addFilter({
          constraint: 'eyeColor',
          values: 'brown',
          mode: 'or'
        })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'eyeColor',
          mode: 'or',
          value: ['blue', 'brown']
        }
      ]);
      store.dispatch(
        actions.removeFilter({
          constraint: 'eyeColor',
          values: 'blue',
          mode: 'or'
        })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'eyeColor',
          mode: 'or',
          value: ['brown']
        }
      ]);
      store.dispatch(
        actions.removeFilter({
          constraint: 'eyeColor',
          values: 'brown',
          mode: 'or'
        })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([]);
    });

    // TODO: deprecate, see GROVE-276; this is a leaky abstraction
    it('passes through constraintType', () => {
      store.dispatch(
        actions.addFilter({
          constraint: 'gender',
          constraintType: 'collection',
          values: 'female'
        })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'gender',
          constraintType: 'collection',
          mode: 'and',
          value: ['female']
        }
      ]);
      store.dispatch(
        actions.removeFilter({ constraint: 'gender', values: 'female' })
      );
      store.dispatch(
        actions.addFilter({
          constraint: 'gender',
          constraintType: 'xs:string',
          values: 'female'
        })
      );
      expect(selectors.stagedFilters(store.getState())).toEqual([
        {
          type: 'selection',
          constraint: 'gender',
          constraintType: 'range',
          mode: 'and',
          value: ['female']
        }
      ]);
    });
  });
});

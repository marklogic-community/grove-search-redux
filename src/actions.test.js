/* eslint-env jest */

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { initialState } from './test-helpers'

import * as actions from './actions'
import * as types from './actionTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('search actions', () => {
  describe('setQtext', () => {
    it('creates a setQtext action', () => {
      const qtext = 'qtext'
      const expectedAction = {
        type: types.SET_QTEXT,
        payload: {
          qtext: qtext
        }
      }
      expect(actions.setQtext(qtext)).toEqual(expectedAction)
    })
  })

  describe('changePage', () => {
    it('creates a changePage action', () => {
      const expectedAction = {
        type: types.CHANGE_PAGE,
        payload: {
          page: 2
        }
      }
      expect(actions.changePage(2)).toEqual(expectedAction)
    })
  })

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('creates SEARCH_SUCCESS when search successful', () => {
      nock('http://localhost')
        .post(/search/)
        .reply(200, {
          response: {
            results: [],
            facets: {}
          }
        })
      const mockQuery = {}
      const expectedActions = [
        { type: types.SEARCH_REQUESTED, payload: {query: mockQuery} },
        {
          type: types.SEARCH_SUCCESS,
          payload: {
            response: {
              results: [],
              facets: {}
              // TODO: What else? Maybe where we define the shape of the contract?
            }
          }
        }
      ]
      const store = mockStore({ search: initialState })
      return store.dispatch(actions.runSearch(mockQuery)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('creates SEARCH_FAILURE when search failed', () => {
      nock('http://localhost')
        .post(/search/)
        .reply(400, {
          errorResponse: {
            statusCode: 400,
            status: 'Bad Request',
            message: 'REST-INVALIDTYPE: (rest:INVALIDTYPE) Invalid type',
            messageCode: 'REST-INVALIDTYPE'
          }
        })
      const mockQuery = {}
      const expectedActions = [
        { type: types.SEARCH_REQUESTED, payload: {query: mockQuery} },
        {
          type: types.SEARCH_FAILURE,
          payload: {
            error: expect.stringContaining('error')
          }
        }
      ]
      const store = mockStore({
        search: initialState
      })
      return store.dispatch(actions.runSearch(mockQuery)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})

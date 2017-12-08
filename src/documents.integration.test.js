/* eslint-env jest */
// TODO: extract documents to one level up (ml-documents-redux)
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import nock from 'nock'

import reducer, { selectors } from './'
import * as actions from './actions'

describe('documents', () => {
  afterEach(nock.cleanAll)

  let store
  beforeEach(() => {
    store = createStore(reducer, applyMiddleware(thunk))
  })

  it('returns undefined for nonexistent document', () => {
    expect(selectors.documentByUri(
      store.getState(),
      '/no-such-doc.json'
    )).toBe(undefined)
  })

  it('fetches a doc successfully', (done) => {
    const docUri = '/fetched-doc.json'
    const doc = {hello: 'world'}
    nock('http://localhost')
      .get(/documents/)
      .query({uri: '/fetched-doc.json'})
      .reply(200, {
        content: doc
      })
    expect(
      selectors.isDocumentFetchPending(store.getState(), docUri)
    ).toBe(false)
    const unsubscribe = store.subscribe(() => {
      expect(
        selectors.isDocumentFetchPending(store.getState(), docUri)
      ).toBe(true)
      unsubscribe()
    })
    store.dispatch(actions.fetchDoc('/fetched-doc.json')).then(() => {
      expect(
        selectors.isDocumentFetchPending(store.getState(), docUri)
      ).toBe(false)
      expect(selectors.documentByUri(
        store.getState(),
        '/fetched-doc.json'
      )).toEqual(doc)
      done()
    })
  })

//   it('fetches a document that is not in state', () => {
//     const doc = {hello: 'world'}
//     nock('http://localhost')
//       .get(/documents/)
//       .query({uri: '/fetched-doc.json'})
//       .reply(200, {
//         content: doc
//       })
//     store.dispatch(
//       actions.fetchDocIfNeeded(
//         '/fetched-doc.json',
//         // We pass this second argument in so the action does not have to
//         // inspect state which in the current thunk implementation can lead
//         // to it having too much information about where it is mounted
//         selectors.documentByUri(
//           store.getState(),
//           '/fetched-doc.json'
//         )
//       )
//     )
//     expect(selectors.documentByUri(
//       store.getState(),
//       '/fetched-doc.json'
//     )).toBe(doc)
//   })
})

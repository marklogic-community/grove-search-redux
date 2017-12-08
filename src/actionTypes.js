// TODO: extract documents to one level up (ml-documents-redux)
export * from './documentActionTypes'

export const SET_QTEXT = 'search/SET_QTEXT'

export const CHANGE_PAGE = 'search/CHANGE_PAGE'
export const CHANGE_PAGE_LENGTH = 'search/CHANGE_PAGE_LENGTH'

export const CONSTRAINT_ADD = 'search/CONSTRAINT_ADD'
export const CONSTRAINT_REMOVE = 'search/CONSTRAINT_REMOVE'

export const SUGGEST_REQUESTED = 'search/SUGGEST_REQUESTED'
export const SUGGEST_SUCCESS = 'search/SUGGEST_SUCCESS'
export const SUGGEST_FAILURE = 'search/SUGGEST_FAILURE'

export const SEARCH_REQUESTED = 'search/SEARCH_REQUESTED'
export const SEARCH_SUCCESS = 'search/SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'search/SEARCH_FAILURE'

export const OPTIONS_REQUESTED = 'search/OPTIONS_REQUESTED'
export const OPTIONS_SUCCESS = 'search/OPTIONS_SUCCESS'
export const OPTIONS_FAILURE = 'search/OPTIONS_FAILURE'

export const DETAIL_REQUESTED = 'detail/DETAIL_REQUESTED'
export const DETAIL_SUCCESS = 'detail/DETAIL_SUCCESS'
export const DETAIL_FAILURE = 'detail/DETAIL_FAILURE'

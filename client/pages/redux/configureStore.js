import { combineReducers, createStore } from 'redux'

import views from './ducks/views.js'

const reducer = combineReducers({ views })

const store = createStore(reducer)

export default store

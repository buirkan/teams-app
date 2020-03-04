import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import ReduxThunk from 'redux-thunk'

import '../src/components/template/App.css'
import Home from './components/Home'
import rootReducers from './reducers/rootReducers'

const reduxDT = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(promise, ReduxThunk)(createStore)(rootReducers, reduxDT)

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <Home />
        </Provider>
    </StrictMode>, document.getElementById('root'))
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import '../src/components/template/App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Main from './components/main/Main'
import rootReducers from './reducers/rootReducers'

const reduxDT = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(promise, ReduxThunk)(createStore)(rootReducers, reduxDT)

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <Main />
        </Provider>
    </StrictMode>, document.getElementById('root'))
import {combineReducers} from 'redux'
import teamReducer from './teamReducer'

const mainReducer = combineReducers({
    team: teamReducer
})

export default mainReducer
import { combineReducers } from 'redux'
import teamReducer from './teamReducer'
import champioshipReducer from './champioshipReducer'

const mainReducer = combineReducers({
    team: teamReducer,
    league: champioshipReducer
})

export default mainReducer
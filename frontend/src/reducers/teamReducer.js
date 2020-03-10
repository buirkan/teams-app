const INITIAL_STATE = { 
    teams: [], 
    myTeam: null 
}

// pure function
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'FAVORITE_TEAM_ADDED':
            return { ...state, myTeam: action.payload }
        default:
            return state
    }
}
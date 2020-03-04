const INITIAL_STATE = { teams: [] }

// pure function
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'TEAMS_SEARCHED':
            return {
                ...state, teams: action.payload
            }
            default:
                return state
    }
}
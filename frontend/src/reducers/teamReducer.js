export const INITIAL_STATE = {
    myTeam: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'FAVORITE_TEAM_ADDED':
            return { ...state, myTeam: action.payload }
        case 'REMOVE_FAVORITE_TEAM':
            return { ...state, myTeam: null }
        default:
            return state
    }
}
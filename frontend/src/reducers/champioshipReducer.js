export const INITIAL_STATE = {
    idChampioship: '',
    teamLeagueMatches: '',
    leaguePage: 1
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'CHANGE_TEAM_LEAGUE_MATCHES':
            return { ...state, teamLeagueMatches: action.payload }
        case 'CHANGE_LEAGUE_PAGE':
            return { ...state, leaguePage: action.payload }
        case 'CHAMPIOSHIP_SELECTED':
            return { ...state, idChampioship: action.payload }
        default:
            return state
    }
}
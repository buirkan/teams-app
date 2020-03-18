export const ChangeLeagueToShow = (leagueId) => {
    return {
        type: 'CHANGE_TEAM_LEAGUE_MATCHES',
        payload: leagueId
    }
}

export const SelectChampioship = (id) => {
    return {
        type: 'CHAMPIOSHIP_SELECTED',
        payload: id
    }
}

export const ChangePage = (pageNumber) => {
    return {
        type: 'CHANGE_LEAGUE_PAGE',
        payload: pageNumber
    }
}
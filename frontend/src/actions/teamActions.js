export const setMyTeam = (team) => {
    return {
        type: 'FAVORITE_TEAM_ADDED',
        payload: team
    }
}

export const removeFavoriteTeam = () => {
    return {
        type: 'REMOVE_FAVORITE_TEAM'
    }
}
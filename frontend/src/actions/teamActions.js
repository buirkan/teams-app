/**
 * Ação para selecionar o time recebido como o time favorito.
 *
 * @team dados do time selecionado como time favorito
 */
export const setMyTeam = (team) => {
    return {
        type: 'FAVORITE_TEAM_ADDED',
        payload: team
    }
}

/**
 * Ação para remover o time selecionado como time favorito.
 *
 */
export const removeFavoriteTeam = () => {
    return {
        type: 'REMOVE_FAVORITE_TEAM'
    }
}
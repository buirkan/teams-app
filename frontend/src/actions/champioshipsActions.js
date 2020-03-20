/**
 * Ação para direcionar para a apresentação de todas as partidas de um campeonato.
 *
 * @leagueId identificador da liga para seleção de partidas
 */
export const ChangeLeagueToShow = (leagueId) => {
    return {
        type: 'CHANGE_TEAM_LEAGUE_MATCHES',
        payload: leagueId
    }
}

/**
 * Ação para selectionar de qual campeonato será apresentadas as partidas na página home, 
 * onde o confronto envolve o time selecionado como favorito.
 *
 * @id identificador do campeonato para as partidas
 */
export const SelectChampioship = (id) => {
    return {
        type: 'CHAMPIOSHIP_SELECTED',
        payload: id
    }
}

/**
 * Armazena o número da página da lista de partidas em que foi carregada.
 *
 * @pageNumber número da página que foi apresentada.
 */
export const ChangePage = (pageNumber) => {
    return {
        type: 'CHANGE_LEAGUE_PAGE',
        payload: pageNumber
    }
}
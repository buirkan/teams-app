import { ChangeLeagueToShow, ChangePage, SelectChampioship } from '../actions/champioshipsActions'
import champioshipReducer, { INITIAL_STATE } from '../reducers/champioshipReducer'

describe('Champioship list of matches element', () => {
    describe('Actions', () => {
        it('Shoud change the league to show', () => {
            const value = '670'
            const expectedAction = {
                type: 'CHANGE_TEAM_LEAGUE_MATCHES',
                payload: '670'
            }
            expect(ChangeLeagueToShow(value)).toEqual(expectedAction)
        })

        it('Should change page', () => {
            const value = 2
            const expectedAction = {
                type: 'CHANGE_LEAGUE_PAGE',
                payload: value
            }
            expect(ChangePage(value)).toEqual(expectedAction)
        })

        it('Champioship matches on select field', () => {
            const value = '673'
            const expectedAction = {
                type: 'CHAMPIOSHIP_SELECTED',
                payload: '673'
            }
            expect(SelectChampioship(value)).toEqual(expectedAction)
        })
    })

    describe('Reducer tests', () => {
        it('Should return the initial state', () => {
            expect(champioshipReducer(undefined, {})).toEqual(INITIAL_STATE)
        })

        it('Handle change league to show', () => {
            const action = {
                type: 'CHANGE_TEAM_LEAGUE_MATCHES',
                payload: '670'
            }
            expect(champioshipReducer(INITIAL_STATE, action))
                .toEqual({
                    ...INITIAL_STATE,
                    teamLeagueMatches: action.payload
                })
        })

        it('Handle change of pagination', () => {
            const action = {
                type: 'CHANGE_LEAGUE_PAGE',
                payload: 10
            }
            expect(champioshipReducer(INITIAL_STATE, action))
                .toEqual({
                    ...INITIAL_STATE,
                    leaguePage: action.payload
                })
        })

        it('Handle change league on selection options', () => {
            const action = {
                type: 'CHAMPIOSHIP_SELECTED',
                payload: '673'
            }
            expect(champioshipReducer(INITIAL_STATE, action))
                .toEqual({
                    ...INITIAL_STATE,
                    idChampioship: action.payload
                })
        })
    })
})
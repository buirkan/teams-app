import React from 'react'
import renderer from 'react-test-renderer'
import { setMyTeam, removeFavoriteTeam } from '../actions/teamActions'
import teamReducer, { INITIAL_STATE } from '../reducers/teamReducer'

describe('Teams component test', () => {
    const teamMock = {
        id: '1004'
    }
    describe('Actions', () => {
        it('Setting a team as my team', () => {
            const expectedAction = {
                type: 'FAVORITE_TEAM_ADDED',
                payload: teamMock
            }
            expect(setMyTeam(teamMock)).toEqual(expectedAction)
        })

        it('Removing a team as my team', () => {
            const expectedAction = {
                type: 'REMOVE_FAVORITE_TEAM'
            }
            expect(removeFavoriteTeam(teamMock)).toEqual(expectedAction)
        })
    })

    describe('Reducer tests', () => {
        it('Returning initial state', () => {
            expect(teamReducer(undefined, {})).toEqual(INITIAL_STATE)
        })

        it('Handle add favorite team', () => {
            const action = {
                type: 'FAVORITE_TEAM_ADDED',
                payload: teamMock
            }
            expect(
                teamReducer({
                    myTeam: teamMock
                }, action)
            ).toEqual({
                myTeam: teamMock
            })
        })

        it('Handle remove favorite team', () => {
            const action = {
                type: 'REMOVE_FAVORITE_TEAM',
            }
            expect(
                teamReducer({
                    myTeam: teamMock
                }, action)
            ).toEqual({
                myTeam: null
            })
        })
    })
})
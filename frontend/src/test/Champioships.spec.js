import React from 'react'
import renderer from 'react-test-renderer'
import { ChampioshipList, mapStateToProps } from '../components/ChampioshipList'
import { ChangeLeagueToShow, ChangePage, SelectChampioship } from '../actions/champioshipsActions'

describe('Champioship list of matches element', () => {

    describe('The container element', () => {
        describe('mapStateToProps', () => {

            it('Mapping state to props correctly', () => {
                const initialState = {
                    league: {
                        idChampioship: '670',
                        teamLeagueMatches: '673',
                        leaguePage: 1
                    },
                    team: {
                        myTeam: {
                            id: 1
                        } 
                    }
                }
                expect(mapStateToProps(initialState).league.idChampioship).toEqual('670')
                expect(mapStateToProps(initialState).league.teamLeagueMatches).toEqual('673')
                expect(mapStateToProps(initialState).league.leaguePage).toEqual(1)
            })


        })
    })

    describe('The display of element', () => {
        it('Should not regress', () => {
            const tree = renderer.create(
                <ChampioshipList idLeague='670' myTeam={{ id: 1 }} />
            )
            expect(tree.toJSON()).toMatchSnapshot()
        })
    })
})
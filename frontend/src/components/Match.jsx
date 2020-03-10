import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ONE_TEAM_BRASILEIRO } from '../queries/teamsQueries'
import { INFO_LIGA, GET_ONE_STADIUM } from '../queries/champioshipsQueries'
import { Loader } from './template/Loader'
import styled from 'styled-components'
import TeamLogo from './template/TeamLogo'
import Condition from './template/Condition'

const MatchLabel = styled.div`

`

const Score = styled.div``

const ChampioshipInfo = ({ id }) => {
    const leagueInfo = useQuery(INFO_LIGA, { variables: { id: id } })
    var responseInfo = null

    if(leagueInfo.data) {
        responseInfo = leagueInfo.data.infoCampeonato
        console.log(responseInfo)
    }

    return (
        <label>
            {/* <span>{responseInfo.nome}</span> */}
            {/* <span>responseInfo.rodada</span> */}
        </label>
    )
}

const Match = (props) => {
    const homeTeam = useQuery(GET_ONE_TEAM_BRASILEIRO, {
        variables: {
            id: props.itemOfMatch.idEquipeMandante
        }
    })
    const awayTeam = useQuery(GET_ONE_TEAM_BRASILEIRO, {
        variables: {
            id: props.itemOfMatch.idEquipeVisitante
        }
    })
    const stadium = useQuery(GET_ONE_STADIUM, {
        variables: {
            id: props.itemOfMatch.idEstadio
        }
    })

    var responseHomeData, responseAwayData, responseStadium, matchData = null

    if (homeTeam.loading || awayTeam.loading || stadium.loading)
        return <Loader />

    if (homeTeam.data)
        responseHomeData = homeTeam.data.getTimeBrasileiro

    if (awayTeam.data)
        responseAwayData = awayTeam.data.getTimeBrasileiro

    if (stadium.data)
        responseStadium = stadium.data.getEstadio

    if (homeTeam.data && awayTeam.data && stadium.data) {
        matchData = {
            ...props.itemOfMatch,
            equipeMandante: { ...responseHomeData },
            equipeVisitante: { ...responseAwayData },
            estadio: { ...responseStadium }
        }
    }

    return (
        <div>
            <MatchLabel>
                <Condition condition={!homeTeam.loading && !awayTeam.loading && !stadium.loading}>
                    <ChampioshipInfo />
                    <Score>
                        <TeamLogo team={matchData.equipeMandante} />
                        <h4>{matchData.placar.golsMandante} : {matchData.placar.golsVisitante}</h4>
                        <TeamLogo team={matchData.equipeVisitante} />
                    </Score>
                </Condition>
            </MatchLabel>
        </div>
    )
}

export default Match
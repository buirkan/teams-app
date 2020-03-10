import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ONE_TEAM_BRASILEIRO } from '../queries/teamsQueries'
import { GET_ONE_STADIUM } from '../queries/champioshipsQueries'
import { Loader } from './template/Loader'

const MatchItem = (props) => {
    // const Loading = (props) => props.condition ? props.children : false
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

    var responseHomeData = null
    var responseAwayData = null 
    var responseStadium = null 
    var matchData = null

    if (homeTeam.loading || awayTeam.loading || stadium.loading)
        return <Loader />

    if (homeTeam.data)
        responseHomeData = homeTeam.data.getTimeBrasileiro

    if (awayTeam.data)
        responseAwayData = awayTeam.data.getTimeBrasileiro

    if (stadium.data)
        responseStadium = stadium.data.getEstadio

    if (homeTeam.data && awayTeam.data && stadium.data)
        matchData = {
            ...props,
            equipeMandante: { ...responseHomeData },
            equipeVisitante: { ...responseAwayData },
            estadio: { ...responseStadium }
        }

    return (
        <div>
            {JSON.stringify(matchData)}
        </div>
    )
}

export default MatchItem
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ONE_TEAM_BRASILEIRO } from '../queries/teamsQueries'
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

    var responseHomeData = null
    var responseAwayData = null

    if (homeTeam.loading || awayTeam.loading)
        return <Loader />

    if (homeTeam.data)
        responseHomeData = homeTeam.data.getTimeBrasileiro

    if (awayTeam.data)
        responseAwayData = awayTeam.data.getTimeBrasileiro

    if (homeTeam.data && awayTeam.data)
        console.log({ 
            ...props, 
            equipeMandante: { ...responseHomeData }, 
            equipeVisitante: { ...responseAwayData } 
        })

    return (
        <div>
            {/* {JSON.stringify(responseHomeData)} */}
        </div>
    )
}

export default MatchItem
import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { GET_ONE_TEAM_BRASILEIRO } from '../queries/teamsQueries'
import { Loader } from './template/Loader'
import TeamLogo from './template/TeamLogo'
import TeamDetails from './TeamDetails'
import ChampioshipInfo from './ChampioshipInfo'
import StadiumInfo from './StadiumInfo'

const MatchLabel = styled.div``

const Score = styled.div``

const LogoArea = styled.div`
    display: inline-block;
    cursor: pointer
`

const MatchDate = ({ date }) => {
    const formatStringNumber = (val) => ('0' + val).slice(-2)
    const dateFormatted = `${formatStringNumber(date.dayOfMonth)}/${formatStringNumber(date.monthValue)}/
    ${date.year}`
    const hourFormatted = `${date.hour}:${formatStringNumber(date.minute)}`

    return (
        <Fragment>
            <span>{dateFormatted} - {hourFormatted}</span>
        </Fragment>
    )
}

const DetailsLabel = (props) => {
    const [modalDisplay, changeDisplay] = useState(false)
    const handleChangeDisplay = (val) => changeDisplay(val)
    const matchData = props.match

    const ShowDetails = (props) => {
        if (modalDisplay)
            return (
                <TeamDetails
                    match={matchData}
                    teamData={props.team}
                    displayDetails={modalDisplay}
                    handle={handleChangeDisplay} />
            )
        else
            return null
    }

    return (
        <Fragment>
            <ShowDetails team={props.team} />
            <LogoArea onClick={() => handleChangeDisplay(true)}>
                <TeamLogo team={props.team} />
                <h4>{props.team.nome}</h4>
            </LogoArea>
        </Fragment>
    )
}

const Match = (props) => {
    var responseHomeData, responseAwayData, matchData = null

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

    if (homeTeam.loading || awayTeam.loading)
        return <Loader />

    if (homeTeam.data) {
        responseHomeData = homeTeam.data.getTimeBrasileiro
    }

    if (awayTeam.data) {
        responseAwayData = awayTeam.data.getTimeBrasileiro
    }

    if (homeTeam.data && awayTeam.data) {
        matchData = {
            ...props.itemOfMatch,
            equipeMandante: { ...responseHomeData },
            equipeVisitante: { ...responseAwayData },
        }
        // action to set teams of list page on state
    }

    return (
        <div>
            <MatchLabel>
                <ChampioshipInfo id={matchData.idCampeonato} />
                <Score>
                    <DetailsLabel match={matchData} team={matchData.equipeMandante} />
                    <h4>{matchData.placar.golsMandante} : {matchData.placar.golsVisitante}</h4>
                    <DetailsLabel match={matchData} team={matchData.equipeVisitante} />
                </Score>
                <MatchDate date={matchData.dataDaPartida} />
                <StadiumInfo idEstadio={matchData.idEstadio} />
            </MatchLabel>
        </div>
    )
}

export default Match
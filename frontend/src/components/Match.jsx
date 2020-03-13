import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { GET_ONE_TEAM_BRASILEIRO, GET_ONE_TEAM_COPA_BRASIL } from '../queries/teamsQueries'
import { Loader } from './template/Loader'
import TeamLogo from './template/TeamLogo'
import TeamDetails from './TeamDetails'
import ChampioshipInfo from './ChampioshipInfo'
import StadiumInfo from './StadiumInfo'
import { connect } from 'react-redux'
import { CHAMPIOSHIPS_ID } from '../utils'

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
    const query = props.itemOfMatch.idCampeonato === CHAMPIOSHIPS_ID.brasileiro ?
        GET_ONE_TEAM_BRASILEIRO :
        GET_ONE_TEAM_COPA_BRASIL

    var responseHomeData, responseAwayData, matchData = null

    const homeTeam = useQuery(query, { variables: { id: props.itemOfMatch.idEquipeMandante } })
    const awayTeam = useQuery(query, { variables: { id: props.itemOfMatch.idEquipeVisitante } })

    if (homeTeam.loading || awayTeam.loading)
        return <Loader />

    if (homeTeam.data) {
        responseHomeData = query === GET_ONE_TEAM_BRASILEIRO ?
            homeTeam.data.getTimeBrasileiro :
            homeTeam.data.getTimeCopaBrasil
    }

    if (awayTeam.data) {
        responseAwayData = query === GET_ONE_TEAM_BRASILEIRO ?
            awayTeam.data.getTimeBrasileiro :
            awayTeam.data.getTimeCopaBrasil
    }

    if (homeTeam.data && awayTeam.data) {
        matchData = {
            ...props.itemOfMatch,
            equipeMandante: { ...responseHomeData },
            equipeVisitante: { ...responseAwayData },
        }
    }

    return (
        <div>
            <MatchLabel>
                <ChampioshipInfo id={matchData.idCampeonato} />
                <span>Rodada {matchData.rodada}</span>
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

const mapStateToProps = (state) => ({ idLeague: state.league.idChampioship })
export default connect(mapStateToProps, null)(Match)
import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { GET_ONE_TEAM_BRASILEIRO, GET_ONE_TEAM_COPA_BRASIL } from '../queries/teamsQueries'
import { Loader } from './template/Loader'
import TeamLogo from './template/TeamLogo'
import TeamDetails from './TeamDetails'
import ChampioshipInfo from './ChampioshipInfo'
import StadiumInfo from './StadiumInfo'
import { CHAMPIOSHIPS_ID } from '../utils'
import { LogoArea } from './template/styled/LogoArea'
import { MatchLabel } from './template/styled/MatchLabel'
import { Score, ScoreLabel } from './template/styled/ScoreLabel'

const MatchDate = ({ date }) => {
    const formatStringNumber = (val) => ('0' + val).slice(-2)
    const dateFormatted = `${formatStringNumber(date.dayOfMonth)}/${formatStringNumber(date.monthValue)}/
    ${date.year}`
    const hourFormatted = `${date.hour}:${formatStringNumber(date.minute)}`

    return (
        <Fragment>
            <h6>{dateFormatted} - {hourFormatted}</h6>
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
                <TeamLogo team={props.team} largeImage={true} />
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
        responseHomeData = query === GET_ONE_TEAM_BRASILEIRO
            ? homeTeam.data.getTimeBrasileiro
            : homeTeam.data.getTimeCopaBrasil
    }

    if (awayTeam.data) {
        responseAwayData = query === GET_ONE_TEAM_BRASILEIRO
            ? awayTeam.data.getTimeBrasileiro
            : awayTeam.data.getTimeCopaBrasil
    }

    if (homeTeam.data && awayTeam.data) {
        matchData = {
            ...props.itemOfMatch,
            equipeMandante: { ...responseHomeData },
            equipeVisitante: { ...responseAwayData },
        }
    }

    return (
        <div className='container'>
            <div style={{ textAlign: '-webkit-center', zIndex: '-1' }} className="justify-content-lg-center">
                <MatchLabel className='col-lg-10 col-md-10 col-sm-10 col-10'>
                    <ChampioshipInfo id={matchData.idCampeonato} />
                    <div className="col-12">
                        <h6>Rodada {matchData.rodada}</h6>
                    </div>
                    <Score>
                        <DetailsLabel match={matchData} team={matchData.equipeMandante} />
                        <ScoreLabel>
                            <h1>{matchData.placar.golsMandante} : {matchData.placar.golsVisitante}</h1>
                        </ScoreLabel>
                        <DetailsLabel match={matchData} team={matchData.equipeVisitante} />
                    </Score>
                    <MatchDate date={matchData.dataDaPartida} />
                    <StadiumInfo idEstadio={matchData.idEstadio} />
                </MatchLabel>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ idLeague: state.league.idChampioship })
export default connect(mapStateToProps, null)(Match)
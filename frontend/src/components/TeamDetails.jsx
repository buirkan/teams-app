import React, { Fragment } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { CONFRONTOS_LIGA, INFO_LIGA } from '../queries/champioshipsQueries'
import { Loader } from './template/Loader'
import TeamLogo from './template/TeamLogo'
import StadiumInfo from './StadiumInfo'
import { GET_ONE_TEAM_BRASILEIRO, GET_ONE_TEAM_COPA_BRASIL } from '../queries/teamsQueries'
import { CHAMPIOSHIPS_ID } from '../utils'

const ModalBg = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    cursor: default;
    height: 100%;
    background: hsla(0, 0%, 22%, 0.6);
    display: 'block';
`

const DetailModal = styled.div`
    position: fixed;
    padding: 1rem;
    overflow-y: auto;
    background: hsl(0, 0%, 99%);
    border: 5px double hsl(0,0%,27%);
    border-radius: 15px;
    width: 80%;
    height: 88%;
    z-index: 1;
    top: 50%;
    cursor: default;
    left: 50%;
    transform: translate(-50%, -50%);
    display: 'block';
`

const CloseButton = styled.button`
    float: right;
    cursor: pointer;
    margin-right: 2%;
    margin-top: 0.5rem;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    border: 5px double hsl(0, 0%, 27%);
    transition: all 0.15s ease;
    transform: scale(1);
    z-index: 1;
    &:hover {
        transform: scale(1.1) perspective(0.8px);
    };
`

const TeamInfo = ({ teamId, leagueId }) => {
    const query = leagueId === CHAMPIOSHIPS_ID.brasileiro ?
        GET_ONE_TEAM_BRASILEIRO :
        GET_ONE_TEAM_COPA_BRASIL

    const getTeamData = useQuery(query, { variables: { id: teamId } })
    var teamData = null

    if (getTeamData.loading)
        return <Loader />

    if (getTeamData.data)
        teamData = query === GET_ONE_TEAM_BRASILEIRO ?
            getTeamData.data.getTimeBrasileiro :
            getTeamData.data.getTimeCopaBrasil

    return (
        <Fragment>
            <TeamLogo team={teamData} />
        </Fragment>
    )
}

const ActualLeagueInfo = (props) => {
    const leagueInfo = useQuery(INFO_LIGA, { variables: { id: props.idLeague } })
    var info

    if (leagueInfo.data)
        info = leagueInfo.data.infoCampeonato.nome

    return (
        <div>
            <span>{info}</span>
            <span>Rodada: {props.actualRound}</span>
        </div>
    )
}

const DetailContent = (props) => {
    const homePageTeamHome = props.match.equipeMandante
    const homePageTeamAway = props.match.equipeVisitante
    const teamHomeId = props.match.idEquipeMandante
    const teamAwayId = props.match.idEquipeVisitante
    var matches = null

    const matchesQuery = useQuery(CONFRONTOS_LIGA, {
        variables: {
            idHome: teamHomeId,
            idAway: teamAwayId
        }
    })

    if (matchesQuery.loading)
        return <Loader />

    if (matchesQuery.data) {
        matches = matchesQuery.data.confrontosCampeonato

        matches.forEach(match => {
            match.equipeMandante = match.idEquipeMandante === teamHomeId ?
                homePageTeamHome :
                homePageTeamAway
            match.equipeVisitante = match.idEquipeMandante === teamHomeId ?
                homePageTeamAway :
                homePageTeamHome
        })
    }

    return (
        <Fragment>
            <TeamLogo team={props.team} />
            <h1>{props.team.nome}</h1>
            <h4>{props.team.cidade} / {props.team.estado}</h4>
            <hr />
            {matches.map(m => (
                <div key={m.id}>
                    <ActualLeagueInfo idLeague={m.idCampeonato} actualRound={m.rodada} />
                    <div>
                        <TeamInfo teamId={m.idEquipeMandante} leagueId={m.idCampeonato} />
                        <h4>{m.placar.golsMandante} : {m.placar.golsVisitante}</h4>
                        <TeamInfo teamId={m.idEquipeVisitante} leagueId={m.idCampeonato} />
                    </div>
                    <StadiumInfo idEstadio={m.idEstadio} />
                </div>
            ))}
        </Fragment>
    )
}

const TeamDetails = (props) => (
    <Fragment>
        <div style={{ display: props.displayDetails ? 'block' : 'none' }}>
            <ModalBg onClick={() => props.handle(false)} />
            <DetailModal>
                <CloseButton onClick={() => props.handle(false)} />
                <DetailContent team={props.teamData} match={props.match} />
            </DetailModal>
        </div>
    </Fragment>
)

export default TeamDetails
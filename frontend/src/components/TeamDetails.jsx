import React, { Fragment } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { Loader } from './template/Loader'
import TeamLogo from './template/TeamLogo'
import StadiumInfo from './StadiumInfo'
import ChampioshipInfo from './ChampioshipInfo'
import { CONFRONTOS_LIGA } from '../queries/champioshipsQueries'
import { GET_ONE_TEAM_BRASILEIRO, GET_ONE_TEAM_COPA_BRASIL } from '../queries/teamsQueries'
import { CHAMPIOSHIPS_ID } from '../utils'
import { CloseButton, CloseIcon } from './template/styled/CloseButton'
import { LogoArea } from './template/styled/LogoArea'
import { ScoreLabel } from './template/styled/ScoreLabel'

const ModalBg = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
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

const CloseArea = styled.div`
    display: -webkit-box;
`

const TeamName = styled.div`
    display: inline-block;
    margin-left: 3rem;
    vertical-align: bottom;
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
            <LogoArea>
                <TeamLogo team={teamData} largeImage={true} />
            </LogoArea>
        </Fragment>
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
            match.equipeMandante = match.idEquipeMandante === teamHomeId
                ? homePageTeamHome
                : homePageTeamAway
            match.equipeVisitante = match.idEquipeMandante === teamHomeId
                ? homePageTeamAway
                : homePageTeamHome
        })
    }

    return (
        <Fragment>
            <span style={{ marginTop: '-45px', display: 'block' }}>
                <TeamLogo team={props.team} largeImage={true} />
                <TeamName>
                    <h1>{props.team.nome}</h1>
                    <h4>{props.team.cidade} / {props.team.estado}</h4>
                </TeamName>
            </span>
            <hr className='m-4' />
            {matches.map(m => (
                <div key={m.id}>
                    <ChampioshipInfo id={m.idCampeonato} />
                    <div className="col-12">
                        <h6>Rodada {m.rodada}</h6>
                    </div>
                    <div>
                        <TeamInfo teamId={m.idEquipeMandante} leagueId={m.idCampeonato} />
                        <ScoreLabel>
                            <h3>{m.placar.golsMandante} : {m.placar.golsVisitante}</h3>
                        </ScoreLabel>
                        <TeamInfo teamId={m.idEquipeVisitante} leagueId={m.idCampeonato} />
                    </div>
                    <StadiumInfo idEstadio={m.idEstadio} />
                    <hr className='mb-3' />
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
                <CloseArea>
                    <CloseButton onClick={() => props.handle(false)}>
                        <CloseIcon className='fa fa-close'></CloseIcon>
                    </CloseButton>
                </CloseArea>
                <DetailContent team={props.teamData} match={props.match} />
            </DetailModal>
        </div>
    </Fragment>
)

export default TeamDetails
import React from 'react'
import styled from 'styled-components'
import TeamLogo from './TeamLogo'
import { connect } from 'react-redux'
import { removeFavoriteTeam } from '../../actions/teamActions'
import { SelectChampioship } from '../../actions/champioshipsActions'
import { Link } from 'react-router-dom'
import { CHAMPIOSHIPS_ID } from '../../utils'

const Nav = styled.header`
    background-color: orangered;
    color: white;
    padding: 40px;
    line-height: 0px;
`

const Title = styled.h1`
    color: white;
    display: inline-block;
    text-align: center;
    line-height: 0px;
`

const Leagues = (props) => {
    const setLeague = props.leagueSelection

    const handleSelectLeague = (optionId) => {
        var leagueId = null

        if (optionId === CHAMPIOSHIPS_ID.brasileiro)
            leagueId = CHAMPIOSHIPS_ID.brasileiro
        else if (optionId === CHAMPIOSHIPS_ID.copaBrasil)
            leagueId = CHAMPIOSHIPS_ID.copaBrasil

        setLeague(leagueId)
    }

    return (
        <div>
            <Link to="/campeonato">
                <button onClick={() => handleSelectLeague(CHAMPIOSHIPS_ID.brasileiro)}>
                    <span>Partidas campeonato brasileiro</span>
                </button>
            </Link>
            <Link to="/campeonato">
                <button onClick={() => handleSelectLeague(CHAMPIOSHIPS_ID.copaBrasil)}>
                    <span>Partidas copa do Brasil</span>
                </button>
            </Link>
        </div>
    )
}

const ChangeFavoriteTeam = ({ action }) => {
    const removeFavoriteTeam = action

    const handleChangeFavTeam = () => {
        localStorage.removeItem('favoriteTeam')
        removeFavoriteTeam()
    }

    return (
        <div>
            <Link to="/timeFavorito">
                <button onClick={handleChangeFavTeam}>Mudar time favorito</button>
            </Link>
        </div>
    )
}

const Header = (props) => {
    const setLeagueSelected = props.setChampioship
    const removeMyTeam = props.clearMyTeam
    return (
        <Nav>
            <Link to="/home">
                <TeamLogo large={true} team={props.team} />
            </Link>
            <Title>{props.team.nome}</Title>
            <ChangeFavoriteTeam action={removeMyTeam} />
            <Leagues leagueSelection={setLeagueSelected} />
        </Nav>
    )
}

const mapStateToProps = (state) => ({ idLeague: state.league.idChampioship })
const mapDispatchToProps = dispatch => ({
    clearMyTeam: () => dispatch(removeFavoriteTeam()),
    setChampioship: (id) => dispatch(SelectChampioship(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
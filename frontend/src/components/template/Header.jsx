import React, { Fragment } from 'react'
import styled from 'styled-components'
import TeamLogo from './TeamLogo'
import { connect } from 'react-redux'
import { removeFavoriteTeam } from '../../actions/teamActions'
import { SelectChampioship, ChangeLeagueToShow, ChangePage } from '../../actions/champioshipsActions'
import { Link } from 'react-router-dom'
import { CHAMPIOSHIPS_ID } from '../../utils'
import Condition from './Condition'

const Nav = styled.header`
    background-color: #255ABF;
    color: white;
    padding: 40px;
    line-height: 0px;
`

const Title = styled.h1`
    color: whitesmoke;
    display: inline-block;
    vertical-align: bottom;
    margin-bottom: 1rem;
`

const ButtonOptions = styled.button`
    padding: 1.3rem;
    border-radius: 10px;
    background-color: #3C70D9;
    border: 2px solid whitesmoke;
    color: whitesmoke;
    font-weight: 500;
    -webkit-transition: all 0.15s ease;
    transition: all 0.15s ease;
    &:hover {
        background-color: #49D49D;
    };
`

const LeagueSelect = styled.select`
    border: 3px solid #2c49af;
    border-radius: 10px;
    padding: 0.4rem;
    background-color: #3C70D9;
    display: block;
    color: white;
    font-weight: 500;
    &:focus {
        outline: none;
    };
`
const HeaderDivisor = styled.hr`
    border-top: 2px solid rgba(0,0,0,.1);
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
        <Fragment>
            <Link style={{display: 'inline-table'}} to="/campeonato">
                <ButtonOptions type="button" onClick={() => handleSelectLeague(CHAMPIOSHIPS_ID.brasileiro)}>
                    <span>Campeonato Brasileiro</span>
                </ButtonOptions>
            </Link>
            <Link style={{display: 'inline-table'}} to="/campeonato">
                <ButtonOptions type="button" onClick={() => handleSelectLeague(CHAMPIOSHIPS_ID.copaBrasil)}>
                    <span>Copa do Brasil</span>
                </ButtonOptions>
            </Link>
        </Fragment>
    )
}

const ChangeFavoriteTeam = ({ action }) => {
    const removeFavoriteTeam = action

    const handleChangeFavTeam = () => {
        localStorage.removeItem('favoriteTeam')
        removeFavoriteTeam()
    }

    return (
        <Fragment>
            <Link style={{display: 'inline-table'}} to="/timeFavorito">
                <ButtonOptions type="button" onClick={handleChangeFavTeam}>Mudar time favorito</ButtonOptions>
            </Link>
        </Fragment>
    )
}

const Header = (props) => {
    const setLeagueSelected = props.setChampioship
    const changeLeagueMatches = props.changeLeagueMatches
    const removeMyTeam = props.clearMyTeam

    const handleOnChangeLeague = (e) => {
        const leagueId = e.target.value
        props.changePage(1)
        changeLeagueMatches(leagueId)
    }

    return (
        <Nav>
            <div className="container">
                <div className="row">
                    <div className='col-6 text-left'>
                        <Link to="/home">
                            <div>
                                <TeamLogo largeImage={true} team={props.team} />
                                <Title>{props.team.nome}</Title>
                                <HeaderDivisor className='mt-2 mb-3' />
                            </div>
                        </Link>
                        <Condition condition={props.mainPage}>
                            <LeagueSelect onChange={handleOnChangeLeague}>
                                <option value={CHAMPIOSHIPS_ID.brasileiro}>Rodadas no Brasileirão</option>
                                <option value={CHAMPIOSHIPS_ID.copaBrasil}>Rodadas na Copa do Brasil</option>
                            </LeagueSelect>
                        </Condition>
                    </div>
                    <div className="btn-group" role='group'>
                        <ChangeFavoriteTeam action={removeMyTeam} />
                        <Leagues leagueSelection={setLeagueSelected} />
                    </div>
                </div>
            </div>
        </Nav>
    )
}

const mapStateToProps = (state) => ({ idLeague: state.league.idChampioship })
const mapDispatchToProps = dispatch => ({
    clearMyTeam: () => dispatch(removeFavoriteTeam()),
    setChampioship: (id) => dispatch(SelectChampioship(id)),
    changeLeagueMatches: (leagueId) => dispatch(ChangeLeagueToShow(leagueId)),
    changePage: (pageNumber) => dispatch(ChangePage(pageNumber))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
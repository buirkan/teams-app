import React from 'react'
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
    padding: 0.7rem;
    border-radius: 10px;
    display: inline-block;
    position: relative;
    max-height: 4.6em;
    overflow: hidden;
    min-height: 4.6rem;
    min-width: -webkit-fill-available;
    background-color: ${props => props.active ? '#49D49D;' : 'hsla(0,0%,0%,0);'}
    text-overflow: ellipsis;
    white-space: pre-wrap;
    border: 2px solid hsl(0,0%,96%);
    color: hsl(0,0%,96%);
    font-weight: 500;
    -webkit-transition: all 0.15s ease;
    -webkit-transition: all 0.15s ease;
    -webkit-transition: all 0.15s ease;
    transition: all 0.15s ease;
    &:hover {
        background-color: #49D49D;
        color: whitesmoke;
    };
    @media (min-width: 978px) {
        max-height: 3rem;
        min-height: 3rem;
    }
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

/**
 * Cabeçalho do sistema, contendo botões de opções e de navegações entre listas de partidas
 *
 */
const Header = (props) => {
    const changeLeagueMatches = props.changeLeagueMatches
    const setLeagueSelected = props.setChampioship
    const removeMyTeam = props.clearMyTeam
    const changePagination = props.changePage
    const onLeagueId = props.league

    const handleResetPagination = () => changePagination(1)

    const handleOnChangeLeague = (e) => {
        const leagueId = e.target.value
        handleResetPagination()
        changeLeagueMatches(leagueId)
    }

    const handleChangeFavTeam = () => {
        localStorage.removeItem('favoriteTeam')
        removeMyTeam()
    }

    const handleSelectLeague = (optionId) => {
        var leagueId = null

        if (optionId === CHAMPIOSHIPS_ID.brasileiro)
            leagueId = CHAMPIOSHIPS_ID.brasileiro
        else if (optionId === CHAMPIOSHIPS_ID.copaBrasil)
            leagueId = CHAMPIOSHIPS_ID.copaBrasil

        handleResetPagination()
        setLeagueSelected(leagueId)
    }

    return (
        <Nav>
            <div className="container">
                <div className="row">
                    <div className='col-12 col-md-6 text-left'>
                        <Link to="/home">
                            <div onClick={handleResetPagination}>
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
                    <div className="col-12 mt-4 mb-2" role='group'>
                        <div style={{ position: 'relative', display: 'inline-block' }} className="col-4 col-md-3">
                            <Link to="/timeFavorito">
                                <ButtonOptions className='btn' onClick={handleChangeFavTeam}>
                                    <span>Mudar time favorito</span>
                                </ButtonOptions>
                            </Link>
                        </div>
                        <div style={{ position: 'relative', display: 'inline-block' }} className="col-4 col-md-3">
                            <Link to="/campeonato">
                                <ButtonOptions
                                    active={onLeagueId === CHAMPIOSHIPS_ID.brasileiro}
                                    className='btn'
                                    onClick={() => handleSelectLeague(CHAMPIOSHIPS_ID.brasileiro)}>
                                    <span>Campeonato Brasileiro</span>
                                </ButtonOptions>
                            </Link>
                        </div>
                        <div style={{ position: 'relative', display: 'inline-block' }} className="col-4 col-md-3">
                            <Link to="/campeonato">
                                <ButtonOptions
                                    active={onLeagueId === CHAMPIOSHIPS_ID.copaBrasil}
                                    className='btn'
                                    onClick={() => handleSelectLeague(CHAMPIOSHIPS_ID.copaBrasil)}>
                                    <span>Copa do Brasil</span>
                                </ButtonOptions>
                            </Link>
                        </div>
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
import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Loader } from './template/Loader'
import { connect } from 'react-redux'
import { setMyTeam } from '../actions/teamActions'
import { GET_TEAMS_FAVORITO } from '../queries/teamsQueries'
import styled from 'styled-components'

const TeamButton = styled.button`
    min-height: max-content;
    max-height: max-content;
    max-width: 11rem;
    min-width: 11rem;
    border: 2px solid #b3b3b3;
    border-radius: 25px;
`
const TeamItem = ({ team, addFavoriteAction }) => {
    const altText = `Logo do time ${team.nome}`

    const setFavoriteTeam = (teamSelected) => {
        localStorage.setItem('favoriteTeam', JSON.stringify(teamSelected))
        addFavoriteAction(teamSelected)
    }

    return (
        <label className='col-6 col-sm-6 col-md-4 col-lg-3 button-group'>
            <Link to="/home">
                <TeamButton className='test' onClick={() => setFavoriteTeam(team)}>
                    <img src={team.urlLogo} alt={altText} />
                    <h4>{team.nome}</h4>
                    <p>{team.cidade} - {team.estado}</p>
                </TeamButton>
            </Link>
        </label>
    )
}

const FavoriteTeam = (props) => {
    const { loading, error, data } = useQuery(GET_TEAMS_FAVORITO)
    const addFavoriteAction = props.myTeamAction
    var teams = null

    if (loading)
        return <Loader />

    if (error)
        return console.error(`Falha na requisição ${error.message}`)

    if (data)
        teams = data.timesBrasileiro

    return (
        <div className='container'>
            <div className="row">
                <h1 className='display-4'>Selecione o seu time do coração</h1>
                <div className='col-md-12'>
                    {teams.map(team => (
                        <TeamItem addFavoriteAction={addFavoriteAction} key={team.id} team={team} />
                    ))}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({ myTeam: state.team.myTeam })
const mapDispatchToProps = dispatch => ({
    myTeamAction: (t) => dispatch(setMyTeam(t))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteTeam)
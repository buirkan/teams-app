import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Loader } from './template/Loader'
import { connect } from 'react-redux'
import { setMyTeam } from '../actions/teamActions'
import { GET_TEAMS_FAVORITO } from '../queries/teamsQueries'

const FavoriteTeam = (props) => {
    const { loading, error, data } = useQuery(GET_TEAMS_FAVORITO)
    const addFavoriteAction = props.myTeamAction
    var teams = null

    const setFavoriteTeam = (teamSelected) => {
        localStorage.setItem('favoriteTeam', JSON.stringify(teamSelected))
        addFavoriteAction(teamSelected)
    }

    const TeamItem = ({ team }) => {
        const altText = `Logo do time ${team.nome}`

        return (
            <li>
                <button onClick={() => setFavoriteTeam(team)}>
                    <img src={team.urlLogo} alt={altText} />
                    <h4>{team.nome}</h4>
                    <p>{team.cidade} - {team.estado}</p>
                </button>
            </li>
        )
    }

    if (loading)
        return <Loader />

    if (error)
        return console.error(`Falha na requisição ${error.message}`)

    if (data)
        teams = data.timesBrasileiro

    return (
        <div className="App">
            <h1>Selecione o seu time do coração</h1>
            <ul>
                {teams.map(team => (
                    <TeamItem key={team.id} team={team} />
                ))}
            </ul>
        </div>
    )
}
const mapStateToProps = (state) => ({ myTeam: state.myTeam })
const mapDispatchToProps = dispatch => ({
    myTeamAction: (t) => dispatch(setMyTeam(t))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteTeam)
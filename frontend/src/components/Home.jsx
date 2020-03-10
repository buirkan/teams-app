import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import FavoriteTeam from './FavoriteTeam'
import Header from '../components/template/Header'
import ChampioshipList from '../components/ChampioshipList'
import { setMyTeam } from '../actions/teamActions'

const client = new ApolloClient({
    uri: 'http://localhost:4004/'
})

const Home = (props) => {
    const favoriteAction = props.setFavoriteTeam

    const CheckFavoriteStatus = () => {
        const favoriteTeamSelected = JSON.parse(localStorage.getItem('favoriteTeam'))

        if (!favoriteTeamSelected) {
            return <FavoriteTeam />
        }
        else {
            favoriteAction(favoriteTeamSelected)
            return (
                <Fragment>
                    <Header team={favoriteTeamSelected} large={true} />
                    <ChampioshipList />
                </Fragment>
            )
        }
    }

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <CheckFavoriteStatus />
            </div>
        </ApolloProvider>
    )
}

const mapStateToProps = (state) => ({ myTeam: state.myTeam })
const mapDispatchToProps = (dispatch) => ({
    setFavoriteTeam: (t) => dispatch(setMyTeam(t))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

/*
    A aplicação deve atender as seguintes histórias:
    Como torcedor do [time selecionado] quero visualizar as partidas e resultados do time na
    temporada de 2019 na Copa do Brasil e Campeonato Brasileiro.
    Como torcedor do [time selecionado] quero clicar em um campeonato e visualizar todas as
    partidas na temporada de 2019.
    Como torcedor do [time selecionado] quero clicar em um time e ver as partidas contra o [time
    selecionado] ao longo do ano, nos dois campeonatos, caso existam.
    Como torcedor do [time selecionado] quero visualizar a página em meu celular e em meu PC sem
    qualquer impacto na experiência e/ou desempenho.
*/
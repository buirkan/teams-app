import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { setMyTeam } from '../../actions/teamActions'
import FavoriteTeam from '../FavoriteTeam'
import ChampioshipList from '../ChampioshipList'
import Home from '../Home'

const client = new ApolloClient({
    uri: 'http://localhost:4004/'
})

const Main = (props) => {
    const setMyTeam = props.setFavoriteTeam

    const CheckFavoriteStatus = () => {
        const favoriteTeamSelected = JSON.parse(localStorage.getItem('favoriteTeam'))

        if (!favoriteTeamSelected) {
            return false
        }
        else {
            setMyTeam(favoriteTeamSelected)
            return true
        }
    }

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact={true}>
                            {CheckFavoriteStatus() ? <Home /> : <FavoriteTeam />}
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/timeFavorito">
                            <FavoriteTeam />
                        </Route>
                        <Route path="/campeonato" component={ChampioshipList} />
                        <Redirect from="*" to='/' />
                    </Switch>
                </BrowserRouter>
            </div>
        </ApolloProvider>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setFavoriteTeam: (t) => dispatch(setMyTeam(t))
})

export default connect(null, mapDispatchToProps)(Main)
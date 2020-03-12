import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import FavoriteTeam from '../FavoriteTeam'
import { setMyTeam } from '../../actions/teamActions'
import Home from '../Home'
import ChampioshipList from '../ChampioshipList'

const client = new ApolloClient({
    uri: 'http://localhost:4004/'
})

const Main = (props) => {
    const favoriteAction = props.setFavoriteTeam

    const CheckFavoriteStatus = () => {
        const favoriteTeamSelected = JSON.parse(localStorage.getItem('favoriteTeam'))

        if (!favoriteTeamSelected) {
            return false
        }
        else {
            favoriteAction(favoriteTeamSelected)
            return true
        }
    }

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact>
                            {CheckFavoriteStatus() ? <Home /> : <FavoriteTeam />}
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/brasileiro" component={ChampioshipList} />
                        <Route path="/copaBrasil" component={ChampioshipList} />
                        <Redirect from="*" to='/' />
                    </Switch>
                </BrowserRouter>
            </div>
        </ApolloProvider>
    )
}

const mapStateToProps = (state) => ({ myTeam: state.myTeam })
const mapDispatchToProps = (dispatch) => ({
    setFavoriteTeam: (t) => dispatch(setMyTeam(t))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
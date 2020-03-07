import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getTeams } from '../actions/teamActions'

const actions = [getTeams]

const FavoriteTeam = (props) => {
    const { getTeams } = props

    return (
        <div>
            <button onClick={() => getTeams()}></button>
        </div>
    )
}
const mapStateToProps = (state) => ({ teamsList: state.teams })
const mapDispatchToProps = (dispatch) => (bindActionCreators(...actions, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteTeam)

/* 
    graphql & redux actions example:
        https://github.com/kriasoft/react-starter-kit/issues/1686
    graphql executing queries on react
        https://www.apollographql.com/docs/react/data/queries/
*/
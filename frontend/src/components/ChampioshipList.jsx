import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import ReactPaginate from 'react-paginate'
import { Loader } from './template/Loader'
import { MATCHES_BRASILEIRO, MATCHES_COPA_BRASIL } from '../queries/champioshipsQueries'
import Match from './Match'
import { CHAMPIOSHIPS_ID } from '../utils'
import { connect } from 'react-redux'

const MatchesList = (props) => {
    const matches = props.matches.map(m => {
        return (
            <li key={m.id}>
                <Match itemOfMatch={m} />
            </li>
        )
    })
    return (
        <ul>
            {matches}
        </ul>
    )
}

const ChampioshipList = ({ idLeague }) => {
    const queryList = idLeague === CHAMPIOSHIPS_ID.brasileiro ? MATCHES_BRASILEIRO : MATCHES_COPA_BRASIL
    const matches = useQuery(queryList)
    var matchesResponse = null

    if (matches.loading)
        return <Loader />

    if (matches.error)
        return console.error(`Falha na requisição ${matches.error.message}`)

    if (matches.data)
        matchesResponse = idLeague === CHAMPIOSHIPS_ID.brasileiro ? 
            matches.data.partidasBrasileiro : 
            matches.data.partidasCopaBrasil

    return (
        <Fragment>
            <MatchesList matches={matchesResponse} />
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
            />
        </Fragment>
    )
}

const mapStateToProps = (state) => ({ idLeague: state.league.idChampioship })
export default connect(mapStateToProps, null)(ChampioshipList)
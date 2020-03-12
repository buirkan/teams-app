import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { MATCHES_BRASILEIRO } from '../queries/champioshipsQueries'
import { Loader } from './template/Loader'
import Match from './Match'
import ReactPaginate from 'react-paginate'

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

const ChampioshipList = () => {
    const matches = useQuery(MATCHES_BRASILEIRO)
    var matchesResponse = null

    if (matches.loading)
        return <Loader />

    if (matches.error)
        return console.error(`Falha na requisição ${matches.error.message}`)

    if (matches.data)
        matchesResponse = matches.data.partidasBrasileiro

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

export default ChampioshipList
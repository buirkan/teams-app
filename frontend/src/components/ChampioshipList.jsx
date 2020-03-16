import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { MATCHES_BRASILEIRO, MATCHES_COPA_BRASIL } from '../queries/champioshipsQueries'
import { CHAMPIOSHIPS_ID } from '../utils'
import { Loader } from './template/Loader'
import Pagination from './template/Pagination'
import Header from './template/Header'
import Match from './Match'

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

const ChampioshipList = ({ idLeague, myTeam }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [matchesPerPage, setMatchesPerPage] = useState()

    const queryList = idLeague === CHAMPIOSHIPS_ID.brasileiro ? MATCHES_BRASILEIRO : MATCHES_COPA_BRASIL
    const { loading, data } = useQuery(queryList)

    const indexOfLastMatch = currentPage * matchesPerPage
    const indexOfFirstMatch = indexOfLastMatch - matchesPerPage
    
    var matchesResponse, currentMatches = null

    useEffect(() => {
        setMatchesPerPage(10)
    }, [])

    const pager = (pageNumber) => setCurrentPage(pageNumber)

    if (loading)
        return <Loader />

    if (data) {
        matchesResponse = idLeague === CHAMPIOSHIPS_ID.brasileiro ?
            data.partidasBrasileiro :
            data.partidasCopaBrasil

        currentMatches = matchesResponse.slice(indexOfFirstMatch, indexOfLastMatch)
    }

    return (
        <Fragment>
            <Header team={myTeam} large={true} />
            <MatchesList matches={currentMatches} />
            <Pagination itemsPerPage={matchesPerPage} totalItems={matchesResponse.length} paginate={pager} />
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    idLeague: state.league.idChampioship,
    myTeam: state.team.myTeam
})
export default connect(mapStateToProps, null)(ChampioshipList)
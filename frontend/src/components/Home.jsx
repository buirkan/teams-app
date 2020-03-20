import React, { useState, useEffect } from 'react'
import Pagination from 'rc-pagination'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import Header from './template/Header'
import { LAST_MATCHES_BRASILEIRO, LAST_MATCHES_COPA_BRASIL } from '../queries/champioshipsQueries'
import { Loader } from './template/Loader'
import MatchesList from './MatchesList'
import { CHAMPIOSHIPS_ID } from '../utils'
import { ChangePage } from '../actions/champioshipsActions'

/**
 * Componente da página principal.
 *
 */
const HomePage = (props) => {
    const [matchesPerPage, setMatchesPerPage] = useState(10)
    const lastMatchBr = useQuery(LAST_MATCHES_BRASILEIRO, { variables: { teamId: props.myTeam.id } })
    const lastMatchCb = useQuery(LAST_MATCHES_COPA_BRASIL, { variables: { teamId: props.myTeam.id } })
    const leagueId = props.leagueToShow ? props.leagueToShow : CHAMPIOSHIPS_ID.brasileiro
    var respLastMatchBr, respLastMatchCb, matchesOfLeague, currentMatches = null

    const indexOfLastMatch = props.leaguePage * matchesPerPage
    const indexOfFirstMatch = indexOfLastMatch - matchesPerPage

    useEffect(() => {
        props.changePage(props.leaguePage)
        setMatchesPerPage(6)

        if (respLastMatchBr && respLastMatchCb) {
            matchesOfLeague = leagueId === CHAMPIOSHIPS_ID.brasileiro ? respLastMatchBr : respLastMatchCb
            currentMatches = matchesOfLeague.slice(indexOfFirstMatch, indexOfLastMatch)
        }
    }, [respLastMatchBr, respLastMatchCb, props, currentMatches, matchesOfLeague])

    if (lastMatchBr.loading || lastMatchCb.loading)
        return <Loader />

    if (lastMatchBr.data)
        respLastMatchBr = lastMatchBr.data.ultimasRodadasBrasileiro

    if (lastMatchCb.data)
        respLastMatchCb = lastMatchCb.data.ultimasRodadasCopaBrasil

    if (respLastMatchBr && respLastMatchCb) {
        matchesOfLeague = leagueId === CHAMPIOSHIPS_ID.brasileiro ? respLastMatchBr : respLastMatchCb
        currentMatches = matchesOfLeague.slice(indexOfFirstMatch, indexOfLastMatch)

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    const handleOnChange = (e) => props.changePage(e)

    return (
        <div>
            <Header team={props.myTeam} large={true} mainPage={true} />
            <MatchesList matches={currentMatches} />
            <Pagination total={matchesOfLeague.length} current={props.leaguePage} pageSize={matchesPerPage} onChange={handleOnChange} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    myTeam: state.team.myTeam,
    leagueToShow: state.league.teamLeagueMatches,
    leaguePage: state.league.leaguePage
})
const mapDispatchToProps = (dispatch) => ({
    changePage: (pageNumber) => dispatch(ChangePage(pageNumber))
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
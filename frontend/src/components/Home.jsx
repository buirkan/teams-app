import React from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import Header from './template/Header'
import Match from './Match'
import Condition from './template/Condition'
import { LAST_MATCH_BRASILEIRO, LAST_MATCH_COPA_BRASIL } from '../queries/champioshipsQueries'

const HomePage = (props) => {
    const lastMatchBr = useQuery(LAST_MATCH_BRASILEIRO, { variables: { teamId: props.myTeam.id } })
    const lastMatchCb = useQuery(LAST_MATCH_COPA_BRASIL, { variables: { teamId: props.myTeam.id } })
    var respLastMatchBr, respLastMatchCb = null

    if (lastMatchBr.data)
        respLastMatchBr = lastMatchBr.data.ultimaRodadaBrasileiro

    if (lastMatchCb.data)
        respLastMatchCb = lastMatchCb.data.ultimaRodadaCopaBrasil

    return (
        <div>
            <Header team={props.myTeam} large={true} />
            <Condition condition={respLastMatchBr}>
                <Match itemOfMatch={respLastMatchBr} />
            </Condition>
            <Condition condition={respLastMatchCb}>
                <Match itemOfMatch={respLastMatchCb} />
            </Condition>
        </div>
    )
}

const mapStateToProps = (state) => ({ myTeam: state.team.myTeam })
export default connect(mapStateToProps, null)(HomePage)
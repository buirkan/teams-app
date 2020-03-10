import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { MATCHES_BRASILEIRO } from '../queries/champioshipsQueries'
import { Loader } from './template/Loader'
import Match from './Match'

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
            {matchesResponse.map(match =>
                <Match key={match.id} itemOfMatch={match} />
            )}
        </Fragment>
    )
}

export default ChampioshipList
/* CRIAR NO STATE O CAMPEONATO SELECIONADO PARA A API */
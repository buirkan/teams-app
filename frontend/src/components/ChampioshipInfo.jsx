import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { INFO_LIGA } from '../queries/champioshipsQueries'
import { Loader } from './template/Loader'

const ChampioshipInfo = ({ id }) => {
    const leagueInfo = useQuery(INFO_LIGA, { variables: { id: id } })
    var responseInfo = null

    if (leagueInfo.loading)
        return <Loader />

    if (leagueInfo.data)
        responseInfo = leagueInfo.data

    return (
        <div className='col-12'>
            <h5>{responseInfo.infoCampeonato.nome}</h5>
        </div>
    )
}

export default ChampioshipInfo
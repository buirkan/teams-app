import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ONE_STADIUM } from '../queries/champioshipsQueries'

const StadiumData = ({ stadium }) => {
    const formattedData = `${stadium.nome} - ${stadium.cidade} ${stadium.estado}`

    return (
        <Fragment>
            <span>{formattedData}</span>
        </Fragment>
    )
}

const StadiumInfo = (props) => {
    const stadium = useQuery(GET_ONE_STADIUM, {
        variables: {
            id: props.idEstadio
        }
    })
    var stadiumInfo = null

    if(stadium.data)
        stadiumInfo = stadium.data.getEstadio[0]

    if (stadium.data)
        return (
            <div>
                <StadiumData stadium={stadiumInfo} />
            </div>
        )
    else
        return null
}

export default StadiumInfo
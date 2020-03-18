import React from 'react'
import Match from './Match'

const MatchesList = (props) => {
    const matches = props.matches.map(m => {
        return (
            <li className='list-item' key={m.id}>
                <Match itemOfMatch={m} />
            </li>
        )
    })
    return (
        <ul className='list-group'>
            {matches}
        </ul>
    )
}

export default MatchesList
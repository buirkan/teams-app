import React, { Fragment } from 'react'

const Logo = (props) => (
    <Fragment>
        <img
            src={props.team.urlLogo}
            alt={`Logo do time ${props.team.nome}`}
            style={{
                height: props.largeImage ? '100px' : '50px',
                width: props.largeImage ? '100px' : '50px'
            }}
        />
    </Fragment>
)

export default Logo
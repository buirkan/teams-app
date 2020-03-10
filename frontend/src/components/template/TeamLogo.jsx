import React from 'react'
import styled from 'styled-components'
// import Modal from './Modal'

const LogoArea = styled.div`
    display: inline-block;
    cursor: pointer
`
const Logo = (props) => {
    return (
        <LogoArea>
            <img
                src={props.team.urlLogo}
                alt={`Logo do time ${props.team.nome}`}
                style={{
                    height: props.largeImage ? '100px' : '50px',
                    width: props.largeImage ? '100px' : '50px'
                }} />
        </LogoArea>
    )
}

export default Logo
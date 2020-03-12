import React from 'react'
import styled from 'styled-components'
import TeamLogo from './TeamLogo'

const Nav = styled.header`
    background-color: orangered;
    color: white;
    padding: 40px;
    line-height: 0px;
`

const Title = styled.h1`
    color: white;
    display: inline-block;
    text-align: center;
    line-height: 0px;
`

const Header = (props) => {
    return (
        <Nav>
            <TeamLogo large={true} team={props.team} />
            <Title>{props.team.nome}</Title>
        </Nav>
    )
}

export default Header
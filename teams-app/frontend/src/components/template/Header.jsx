import React from 'react'
import styled from 'styled-components'
import TeamLogo from './TeamLogo'

const Nav = styled.header`
    background-color: orangered;
    color: white;
    padding: 40px;
    line-height: 0px;
`

const Header = () => (
    <Nav>
        <TeamLogo />
    </Nav>
)

export default Header
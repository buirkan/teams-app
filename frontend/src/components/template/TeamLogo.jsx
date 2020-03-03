import React from 'react'
import styled from 'styled-components'

const LogoArea = styled.div`
    display: inline-block;
    float: left;
`

// styled.img.attrs({ src: '' })
const Image = styled.span`
    height: ${props => props.largeImage ? '100px' : '50px'};
    width: ${props => props.largeImage ? '100px' : '50px'};
`

const Logo = (props) => (
    <LogoArea>
        <Image largeImage={props.large}>
            Logo
        </Image>
    </LogoArea>
)

export default Logo
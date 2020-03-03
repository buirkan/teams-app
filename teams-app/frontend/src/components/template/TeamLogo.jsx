import React from 'react'
import styled from 'styled-components'

const LogoArea = styled.div`
    display: inline-block;
    float: left;
`

// styled.img.attrs({ src: '' })
const Image = styled.span`
    height: 100px;
    width: 100px;
`

const Logo = () => (
    <LogoArea>
        <Image>
            Logo
        </Image>
    </LogoArea>
)

export default Logo
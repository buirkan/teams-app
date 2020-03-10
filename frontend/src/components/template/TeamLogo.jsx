import React from 'react'
import styled from 'styled-components'

const Logo = (props) => {
    const LogoArea = styled.div`
        display: inline-block;
    `
    const Image = styled.img.attrs({ src: props.team.urlLogo, alt: `Logo do time` })`
        height: ${props => props.largeImage ? '100px' : '50px'};
        width: ${props => props.largeImage ? '100px' : '50px'};
    `
    return (
        <LogoArea>
            <Image largeImage={props.large} />
        </LogoArea>
    )
}

export default Logo
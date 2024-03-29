import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
`

const Spinner = styled.div`
    width:45px;
    height:45px;
    display:inline-block;
    padding:0px;
    border-radius:100%;
    border:5px solid;
    border-top-color: hsl(156, 62%, 56%);
    border-bottom-color: hsla(0, 0%, 100%, 0.3);
    border-left-color: hsl(156, 58%, 54%);
    border-right-color: hsla(0, 0%, 100%, 0.3);
    -webkit-animation: ${rotate} 1s ease-in-out infinite;
    animation: ${rotate} 1s ease-in-out infinite;
    position: relative;
`

const SpinnerLabel = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: block;
`

const Loader = () => (
    <SpinnerLabel>
        <Spinner />
    </SpinnerLabel>
)

export { Loader }
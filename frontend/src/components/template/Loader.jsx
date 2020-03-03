import React, { Fragment } from 'react'
import styled from 'styled-components'

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
    border-top-color:rgba(246, 36, 89, 1);
    border-bottom-color:rgba(255,255,255, 0.3);
    border-left-color:rgba(246, 36, 89, 1);
    border-right-color:rgba(255,255,255, 0.3);
    -webkit-animation: ${rotate} 1s ease-in-out infinite;
    animation: ${rotate} 1s ease-in-out infinite;
`
const Loader = () => (
    <Fragment>
        <Spinner />
    </Fragment>
)

export { Loader }
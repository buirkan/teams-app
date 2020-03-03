import React, { useState, Fragment } from 'react'
import styled from 'styled-components'

const ModalBg = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    cursor: default;
    height: 100%;
    background: hsla(0, 0%, 22%, 0.6);
    display: ${props => props.show}
`

const DetailModal = styled.div`
    position: fixed;
    padding: 1rem;
    overflow-y: auto;
    background: hsl(0, 0%, 99%);
    border: 5px double hsl(0,0%,27%);
    border-radius: 15px;
    width: 82%;
    height: 80%;
    z-index: 1;
    top: 50%;
    cursor: default;
    left: 50%;
    transform: translate(-50%, -50%);
    display: ${props => props.show}
`

const CloseButton = styled.button`
    float: right;
    cursor: pointer;
    margin-right: 2%;
    margin-top: 0.5rem;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    border: 5px double hsl(0, 0%, 27%);
    transition: all 0.15s ease;
    transform: scale(1);
    z-index: 1;
    &:hover {
        transform: scale(1.1) perspective(0.8px);
    };
`
const Modal = () => {
    const [display, changeDisplay] = useState('block')
    const handleBgClick = () => changeDisplay('none')

    return (
        <Fragment>
            <ModalBg show={display} onClick={handleBgClick} />
            <DetailModal show={display}>
                <CloseButton onClick={handleBgClick}>
                    {/* webpack bundle dependecies! */}
                    {/* <i className='fa fa-close' /> */}
                </CloseButton>
            </DetailModal>
        </Fragment>
    )
}

export default Modal
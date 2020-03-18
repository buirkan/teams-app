import styled from 'styled-components'

export const CloseButton = styled.button`
    float: right;
    cursor: pointer;
    margin-right: 2%;
    border-radius: 50%;
    height: 43px;
    width: 43px;
    background-color: #e6e6e6;
    border: 4px solid #bdbdbd;
    -webkit-transition: all 0.15s ease;
    transition: all 0.15s ease;
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    z-index: 1;
    &:hover {
        transform: scale(1.1) perspective(0.8px);
    };
    &:focus {
        outline: none;
    };
`

export const CloseIcon = styled.i`
    font-size: 1.3rem;
    color: #3d3d3d;
`
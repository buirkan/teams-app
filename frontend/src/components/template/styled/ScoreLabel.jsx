import styled from "styled-components"

export const ScoreLabel = styled.div`
    display: inline-block;
    vertical-align: top;
    margin: 2rem;
    text-align: center;
    @media (max-width: 768px) {
        display: block;
        margin: 1rem;
    }
`

export const Score = styled.div`
    text-align: center;
    display: block;
`
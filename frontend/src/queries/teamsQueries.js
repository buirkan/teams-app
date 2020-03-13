import { gql } from 'apollo-boost'

export const GET_TEAMS_COPA_BRASIL = gql`
    {
        timesCopaBrasil {
            id
            nome
            cidade
            estado
            pais
            urlLogo
            timeFantasia
        }
    }
`
export const GET_ONE_TEAM_COPA_BRASIL = gql`
    query($id: ID) {
        getTimeCopaBrasil(id: $id) {
            id
            nome
            cidade
            estado
            urlLogo
        }
    }
`

export const GET_TEAMS_BRASILEIRO = gql`
    {
        timesBrasileiro {
            id
            nome
            cidade
            estado
            pais
            urlLogo
            timeFantasia
        }
    }
`

export const GET_ONE_TEAM_BRASILEIRO = gql`
    query($id: ID) {
        getTimeBrasileiro(id: $id) {
            id
            nome
            cidade
            estado
            urlLogo
        }
    }
`

export const GET_TEAMS_FAVORITO = gql`
    {
        timesBrasileiro {
            id
            nome
            cidade
            estado
            urlLogo
        }
    }
`
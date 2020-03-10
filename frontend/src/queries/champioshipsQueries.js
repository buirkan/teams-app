import { gql } from 'apollo-boost'

export const INFO_COPA_BRASIL = gql`
    {
        copaBrasil {
            id
            nome
            nomeDaTaca
            temporada
            quantidadeDeEquipes
            rodadaAtual
            urlLogo
        }
    }
`

export const INFO_BRASILEIRO = gql`
    {
        brasileiro {
            id
            nome
            nomeDaTaca
            temporada
            quantidadeDeEquipes
            rodadaAtual
            urlLogo
        }
    }
`

export const MATCHES_COPA_BRASIL = gql`
    {
        partidasCopaBrasil {
            id
            idCampeonato
            rodada
            idEquipeMandante
            idEquipeVisitante
            idEstadio
            dataDaPartida {
                hour
                minute
                dayOfMonth
                monthValue
                year
            }
            placar {
                vitoriaMandante
                derrotaVisitante
                derrotaMandante
                vitoriaVisitante
            }
        }
    }
`

export const MATCHES_BRASILEIRO = gql`
    {
        partidasBrasileiro {
            id
            idCampeonato
            rodada
            idEquipeMandante
            idEquipeVisitante
            idEstadio
            dataDaPartida {
                hour
                minute
                dayOfMonth
                monthValue
                year
            }
            placar {
                golsMandante
                golsVisitante
                vitoriaMandante
                derrotaVisitante
                derrotaMandante
                vitoriaVisitante
            }
        }
    }
`

export const STADIUMS = gql`
    {
        estadios {
            id
            nome
            cidade
            estado
            pais
        }
    }
`

export const GET_ONE_STADIUM = gql`
    query($id: ID) {
        getEstadio(id: $id) {
            id
            nome
            cidade
            estado
            pais
        }
    }
`
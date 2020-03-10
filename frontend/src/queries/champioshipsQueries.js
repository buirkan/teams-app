import { gql } from 'apollo-boost'

export const INFO_LIGA = gql `
    query($id: ID){
        infoCampeonato(id: $id) {
            nome
            nomeDaTaca
            temporada
            quantidadeDeEquipes
            rodadaAtual
            urlLogo
        }
    }
`

export const MATCHES_COPA_BRASIL = gql `
    {
        partidasCopaBrasil {
            id
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
            }
        }
    }
`

export const LAST_MATCH_COPA_BRASIL = gql `
    query($teamId: ID) {
        ultimaRodadaCopaBrasil(teamId: $teamId) {
            id
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
            }
        }
    }
`

export const MATCHES_BRASILEIRO = gql `
    {
        partidasBrasileiro {
            id
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
            }
        }
    }
`

export const LAST_MATCH_BRASILEIRO = gql `
    query($teamId: ID) {
        ultimaRodadaBrasileiro(teamId: $teamId) {
            id
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
            }
        }
    }
`

export const STADIUMS = gql `
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

export const GET_ONE_STADIUM = gql `
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
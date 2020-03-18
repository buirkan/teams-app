import { gql } from 'apollo-boost'

export const INFO_LIGA = gql`
    query($id: ID){
        infoCampeonato(id: $id) {
            nome
            temporada
            rodadaAtual
            urlLogo
        }
    }
`

export const CONFRONTOS_LIGA = gql`
    query($idHome: ID, $idAway: ID, $idLeague: ID) {
        confrontosCampeonato(idHome: $idHome, idAway: $idAway, idLeague: $idLeague) {
            id
            rodada
            idEstadio
            idCampeonato
            idEquipeMandante
            idEquipeVisitante
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

export const MATCHES_COPA_BRASIL = gql`
    {
        partidasCopaBrasil {
            id
            rodada
            idCampeonato
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

export const LAST_MATCHES_COPA_BRASIL = gql`
    query($teamId: ID) {
        ultimasRodadasCopaBrasil(teamId: $teamId) {
            id
            rodada
            idCampeonato
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

export const MATCHES_BRASILEIRO = gql`
    {
        partidasBrasileiro {
            id
            rodada
            idCampeonato
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

export const LAST_MATCHES_BRASILEIRO = gql`
    query($teamId: ID) {
        ultimasRodadasBrasileiro(teamId: $teamId) {
            id
            rodada
            idCampeonato
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

export const STADIUMS = gql`
    {
        estadios {
            nome
            cidade
            estado
        }
    }
`

export const GET_ONE_STADIUM = gql`
    query($id: ID) {
        getEstadio(id: $id) {
            nome
            cidade
            estado
        }
    }
`
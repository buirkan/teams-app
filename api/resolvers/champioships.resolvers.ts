import axios from 'axios'
import { apiConfig } from '../../config/config'
import { Agent } from 'https'

const httpsAgent = new Agent({ rejectUnauthorized: false })

const CHAMPIOSHIPS_ID = {
    copaBrasil: "670",
    brasileiro: "673"
}

const resolvers = {
    Query: {
        infoCampeonato: async (_, { id }) => {
            const url = id === CHAMPIOSHIPS_ID.copaBrasil ?
                apiConfig.campeonatos.CopaDoBrasil.url :
                apiConfig.campeonatos.Brasileiro.url

            return await axios.get(url, { httpsAgent })
                .then(response => response.data.data)
                .catch(err => console.log(err))
        },
        partidasCopaBrasil: async () => {
            const url = apiConfig.campeonatos.CopaDoBrasil.partidas
            return await axios.get(url, { httpsAgent })
                .then(response => response.data.data)
                .catch(err => console.log(err))
        },
        ultimaRodadaCopaBrasil: async (_, { teamId }) => {
            const url = apiConfig.campeonatos.CopaDoBrasil.partidas
            var ultimaPartidaDoTime = null

            await axios.get(url, { httpsAgent })
                .then(response => {
                    let matches = response.data.data
                    var rodadaUltimaPartida = null

                    matches.map(match => {
                        if (rodadaUltimaPartida === null)
                            rodadaUltimaPartida = match.rodada

                        if (match.rodada >= rodadaUltimaPartida && (match.idEquipeMandante == teamId ||
                            match.idEquipeVisitante == teamId)) {
                            rodadaUltimaPartida = match.rodada
                            ultimaPartidaDoTime = match
                        }
                    })
                })
                .catch(err => console.log(err))
            return ultimaPartidaDoTime
        },
        partidasBrasileiro: async () => {
            const url = apiConfig.campeonatos.Brasileiro.partidas
            return await axios.get(url, { httpsAgent })
                .then(response => response.data.data)
                .catch(err => console.log(err))
        },
        ultimaRodadaBrasileiro: async (_, { teamId }) => {
            const url = apiConfig.campeonatos.Brasileiro.partidas
            var ultimaPartidaDoTime = null

            await axios.get(url, { httpsAgent })
                .then(response => {
                    let matches = response.data.data
                    var rodadaUltimaPartida = null

                    matches.map(match => {
                        if (rodadaUltimaPartida === null)
                            rodadaUltimaPartida = match.rodada

                        if (match.rodada >= rodadaUltimaPartida && (match.idEquipeMandante == teamId ||
                            match.idEquipeVisitante == teamId)) {
                            rodadaUltimaPartida = match.rodada
                            ultimaPartidaDoTime = match
                        }
                    })
                })
                .catch(err => console.log(err))
            return ultimaPartidaDoTime
        },
        estadios: async () => {
            const url = apiConfig.urlEstadios
            return await axios.get(url, { httpsAgent })
                .then(response => response.data.data)
                .catch(err => console.log(err))
        },
        getEstadio: async (_, { id }) => {
            const url = apiConfig.urlEstadios
            var estadioProcurado = null

            await axios.get(url, { httpsAgent })
                .then(response => {
                    let estadios = response.data.data
                    estadioProcurado = estadios.filter(estadio => estadio.id == id)
                })
                .catch(err => console.log(err))
            return estadioProcurado
        }
    }
}

export default resolvers
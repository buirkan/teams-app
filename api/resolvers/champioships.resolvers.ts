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
        ultimasRodadasCopaBrasil: async (_, { teamId }) => {
            const url = apiConfig.campeonatos.CopaDoBrasil.partidas
            var ultimasPartidaDoTime = []

            await axios.get(url, { httpsAgent })
                .then(response => {
                    let matches = response.data.data

                    matches.map(match => {
                        if (match.idEquipeMandante == teamId || match.idEquipeVisitante == teamId)
                            ultimasPartidaDoTime.push(match)
                    })
                })
                .catch(err => console.log(err))
            return ultimasPartidaDoTime
        },
        partidasBrasileiro: async () => {
            const url = apiConfig.campeonatos.Brasileiro.partidas
            return await axios.get(url, { httpsAgent })
                .then(response => response.data.data)
                .catch(err => console.log(err))
        },
        ultimasRodadasBrasileiro: async (_, { teamId }) => {
            const url = apiConfig.campeonatos.Brasileiro.partidas
            var ultimasPartidaDoTime = []

            await axios.get(url, { httpsAgent })
                .then(response => {
                    let matches = response.data.data

                    matches.map(match => {
                        if (match.idEquipeMandante == teamId || match.idEquipeVisitante == teamId)
                            ultimasPartidaDoTime.push(match)
                    })
                })
                .catch(err => console.log(err))
            return ultimasPartidaDoTime
        },
        confrontosCampeonato: async (_, ids) => {
            const idPrimeiroTime = ids.idHome
            const idSegundoTime = ids.idAway

            const urlBR = apiConfig.campeonatos.Brasileiro.partidas
            const urlCopaBr = apiConfig.campeonatos.CopaDoBrasil.partidas
            var partidas = []

            if (idPrimeiroTime !== null && idSegundoTime !== null) {
                await axios.get(urlBR, { httpsAgent })
                    .then(response => {
                        const data = response.data.data
                        data.map(p => {
                            if ((idPrimeiroTime == p.idEquipeMandante || idPrimeiroTime == p.idEquipeVisitante) &&
                                (idSegundoTime == p.idEquipeMandante || idSegundoTime == p.idEquipeVisitante))
                                partidas.push(p)
                        })
                    })
                    .catch(err => console.log(err))

                await axios.get(urlCopaBr, { httpsAgent })
                    .then(response => {
                        const data = response.data.data
                        data.map(p => {
                            if ((idPrimeiroTime == p.idEquipeMandante || idPrimeiroTime == p.idEquipeVisitante) &&
                                (idSegundoTime == p.idEquipeMandante || idSegundoTime == p.idEquipeVisitante))
                                partidas.push(p)
                        })
                    })
                    .catch(err => console.log(err))
            }
            return partidas
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
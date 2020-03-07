import axios from 'axios'
import { apiConfig } from '../../config/config'
import { Agent } from 'https'

const httpsAgent = new Agent({ rejectUnauthorized: false })
const resolvers = {
    Query: {
        copaBrasil: async () => {
            const url = apiConfig.campeonatos.CopaDoBrasil.url
            return await axios.get(url, { httpsAgent })
                .then(response => response.data.data)
                .catch(err => console.log(err))
        },
        brasileiro: async () => {
            const url = apiConfig.campeonatos.Brasileiro.url
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
        partidasBrasileiro: async () => {
            const url = apiConfig.campeonatos.Brasileiro.partidas
            return await axios.get(url, { httpsAgent })
                .then(response => response.data.data)
                .catch(err => console.log(err))
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
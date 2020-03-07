import axios from 'axios'
import { apiConfig } from '../../config/config'
import { Agent } from 'https'

const httpsAgent = new Agent({ rejectUnauthorized: false })
const resolvers = {
    Query: {
        timesCopaBrasil: async () => {
            const url = apiConfig.campeonatos.CopaDoBrasil.equipes
            return await axios.get(url, { httpsAgent })
                .then(response => response.data.data)
                .catch(error => console.log(error))
        },
        getTimeCopaBrasil: async (_, { id }) => {
            const url = apiConfig.campeonatos.CopaDoBrasil.equipes
            var time = null
            await axios.get(url, { httpsAgent })
                .then(response => {
                    let times = response.data.data
                    time = times.filter(time => time.id == id)
                })
                .catch(err => console.log(err))
            return time
        },
        timesBrasileiro: async () => {
            const url = apiConfig.campeonatos.Brasileiro.equipes
            return await axios.get(url, { httpsAgent })
                .then(response => response.data.data)
                .catch(error => console.log(error))
        },
        getTimeBrasileiro: async (_, { id }) => {
            const url = apiConfig.campeonatos.Brasileiro.equipes
            var time = null
            await axios.get(url, { httpsAgent })
                .then(response => {
                    let times = response.data.data
                    time = times.filter(time => time.id == id)
                })
                .catch(err => console.log(err))
            return time
        }
    }
}

export default resolvers
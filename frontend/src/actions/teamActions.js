import axios from 'axios'
import appConfig from '../config/app.config'

const API_URL = `${appConfig.dev.url}:${appConfig.dev.port}`

export const getTeams = () => {
    return dispatch => {
        let query_route = '/teams/brasileiro'

        axios.get(API_URL.concat(query_route))
            .then(r => {
                dispatch({
                    type: 'TEAMS_SEARCHED',
                    payload: r.data
                })
            })
    }
}
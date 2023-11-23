import axios from 'axios'
import { getAuthToken } from './auth-user.service.ts'
import sign from 'jwt-encode'

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/'
})

axiosClient.interceptors.request.use((config) => {
    config.headers['Authorization'] = sign(JSON.stringify(getAuthToken()), 'secret', { algorithm: 'RS256' })
    return config
})

export default axiosClient

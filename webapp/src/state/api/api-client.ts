import Axios from 'axios'

export const apiClient = Axios.create({
    baseURL: 'http://localhost:3000/api',
})

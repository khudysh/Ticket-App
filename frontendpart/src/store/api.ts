import axios from "axios"

const instance = axios.create({
    baseURL: 'http://89.38.128.168:8080'
})

export default instance
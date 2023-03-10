import axios from "axios"

const axiosInstance = axios.create({
    //baseURL: 'http://192.168.0.128:4002/api/v1/users/',
    baseURL: 'https://app-backend-dot-notetaker-translator.ts.r.appspot.com/api/v1/users/',
    // timeout:3000,
    headers: {
        "Accept" : "*",
        "Content-Type": "application/json",
    },
})

export default class Authenticator {

    static async register(email:string, password:string, name:string) {
        const params = {
            email:email,
            password:password,
            name:name
        }
        const response = await axiosInstance
            .post('/register', params)
            .then((response)=>{
                return response.data
            })
            .catch((error)=>{
                if (error.response) {
                    return {error:error.response.data}
                }
                else if (error.request) {
                    return {error:error.request}
                }
                else {
                    return {error:'An error has occurred.'}
                }
            })
        return response
    }

    static async login(email:string, password:string) {
        const params = {
            email:email,
            password:password,
        }
        const response = await axiosInstance
            .post('/login', params)
            .then((response)=>{
                return response.data
            })
            .catch((error)=>{
                if (error.response) {
                    return {error:error.response.data}
                }
                else if (error.request) {
                    return {error:error.request}
                }
                else {
                    return {error:'An error has occurred.'}
                }
            })
        return response
    }
}
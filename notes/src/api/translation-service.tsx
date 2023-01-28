import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.128:4444/api/v1/translator/',
    // timeout:3000,
    headers: {
        "Accept" : "*",
        "Content-Type": "application/json",
    },
})

export default class Translator {
    static async translate(text:string, source:string, target:string) {
        const params = {
            text:text,
            target:target,
            from:source,
            to:target
        }
        try {
            const result = await axiosInstance.get('/translate', {params})
            return result.data
        }
        catch {
            return {error:'An error has occured'}
        }
    }
}
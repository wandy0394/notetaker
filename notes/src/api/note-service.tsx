import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.128:4002/api/v1/notes/',
    // timeout:3000,
    headers: {
        "Accept" : "*",
        "Content-Type": "application/json",
    },
})

export default class NoteService {

    static async getNotes(user) {

    }

    static async addNote(note, user) {
        
    }
}
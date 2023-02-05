const Notes = require("../models/noteModel")

export default class NotesController {
    
    static async apiGetNotes(req:any, res:any, next:any) {
        const user_id = req.user._id
        if (user_id) {
            try {
                const notes = Notes.find().where({user:user_id})
                res.status(200).json(notes)
            }
            catch (err) {
                res.status(400).json({error:err.message})
            }
        }
        else {
            res.status(400).json({error:'Unauthorised.'})
        }
    }

    static async apiAddNote(req:any, res:any, next:any) {
        const user_id = req.user._id
        const note = req.body.note
        if (user_id) {
            try {
                const newNote = Notes.create({
                    title:note.title,
                    tags: note.tags,
                    markdown: note.markdown,
                    user: user_id
                })
                res.status(200).json({newNote})
            }
            catch (err) {
                res.status(400).json({error:err.message})
            }
        }
    }
    static async apiDeleteNote(req:any, res:any, next:any) {
        try {

        }
        catch (err) {
            res.status(400).json({error:err.message})
        }
    }

    static async apiUpdateNote(req:any, res:any, next:any) {
        try {

        }
        catch (err) {
            res.status(400).json({error:err.message})
        }
    }
}
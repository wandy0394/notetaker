import express from 'express'
import NotesController from '../controllers/notesController'

const router = express.Router()

router.route("/notes")
    .get(NotesController.apiGetNotes)
    .post(NotesController.apiAddNote)
    .delete(NotesController.apiDeleteNote)
    .put(NotesController.apiUpdateNote)
    
export default router
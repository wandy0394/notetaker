import express from 'express'
import NotesController from '../controllers/notesController'
const requireAuth = require("../middleware/requireAuth")
const router = express.Router()

//require auth for all routes
router.use(requireAuth)

router.route("/notes")
    .get(NotesController.apiGetNotes)
    .post(NotesController.apiAddNote)
    .delete(NotesController.apiDeleteNote)
    .put(NotesController.apiUpdateNote)
    
export default router
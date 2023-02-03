export default class NotesController {
    static async apiGetNotes(req:any, res:any, next:any) {
        res.json({msg:'get notes'})
    }
}
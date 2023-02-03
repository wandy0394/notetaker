export default class NotesController {
    static async apiGetNotes(req:any, res:any, next:any) {
        console.log(req)
        res.json({msg:'get notes'})
    }

    static async apiAddNote(req:any, res:any, next:any) {
        console.log(req)
        res.json({msg:'add note'})
    }
    static async apiDeleteNote(req:any, res:any, next:any) {
        console.log(req)
        res.json({msg:'del note'})
    }

    static async apiUpdateNote(req:any, res:any, next:any) {
        console.log(req)
        res.json({msg:'update note'})
    }
}
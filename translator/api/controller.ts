import translate from "../service/translator"
export default class Controller {
    static apiTranslateText(req:any, res:any, next:any) {
        const text = req.query.text
        const target = req.query.target
        const options= {
            from:req.query.from,
            to:req.query.to,
        }
        translate({text, target, options}).then((result)=>{
            res.json({output:result})
        })
        .catch(()=> {
            res.status(500).json('Error')
        })
    }
}
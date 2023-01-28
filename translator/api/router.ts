import controller from "./controller"
import express from 'express'

const router=express.Router()
router.route('/translate')
    .get(controller.apiTranslateText)



export default router
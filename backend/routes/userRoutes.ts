import express from 'express'
import UserController from '../controllers/userController'

const router = express.Router()
router.route('/login')
    .post(UserController.apiLoginUser)
    .get(UserController.apiLoginUser)

router.route('/signup')
    .post(UserController.apiRegisterUser)

router.route('/users')
    .get(UserController.apiGetUser)

export default router
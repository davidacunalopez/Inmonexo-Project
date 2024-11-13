import { Router } from "express";
import {getInfoUser, putUser, getUsers} from '../controllers/users.controllers.js'
import {authRequired} from '../middlewares/validateToken.js'

const router = Router();

router.all('/getUsers', getUsers)
router.get('/infoUser/:id', getInfoUser)
router.put('/editUser/:id', putUser) //Falta el controller
export default router
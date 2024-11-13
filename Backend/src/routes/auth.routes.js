import {Router} from 'express'
import {registerUser, loginUser, verifyTokenRoute, logout} from '../controllers/auth.controllers.js'

const router = Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logout)
router.post('/auth/verify', verifyTokenRoute)


export default router;
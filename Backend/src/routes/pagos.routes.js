import {Router} from "express"
import {getPays, getPaysPropertie, addPay, editPay, deletePay, getPaysUser} from '../controllers/pagos.controller.js'

const router = Router();

router.get('/getPays', getPays)
router.get('/getPayPropertie/:id', getPaysPropertie)
router.get('/getUserPays/:id', getPaysUser)
router.post('/addPays', addPay)
router.put('/editPay/:id', editPay)
router.delete('/deletePay/:id', deletePay)

export default router
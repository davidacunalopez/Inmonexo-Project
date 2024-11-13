import { Router } from "express";
import { getClients, postClient, putClient, deleteClient, getInfoClient, getClientPropertie, fiveClients } from '../controllers/clients.controllers.js'

const router = Router();

router.get('/getClients/:id', getClients)
router.get('/getInfoClient/:id', getInfoClient)
router.get('/getClientsPropertie/:id', getClientPropertie)
router.get('/getFiveClients/:id', fiveClients)
router.post('/addClient', postClient)
router.put('/editClient/:id', putClient)
router.delete('/deleteClient/:id', deleteClient)

export default router;
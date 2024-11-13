import { Router } from "express";
import { addEvent, getEvents, editEvent, deleteEvent } from '../controllers/eventos.controller.js'

const router = Router();

router.post('/addEvent', addEvent)
router.get('/getEvents/:id', getEvents)
router.put('/editEvent/:id', editEvent)
router.delete('/deleteEvent/:id', deleteEvent)

export default router;
import { Router } from "express";
import {addPropertie, editPropertie, getProperties, getUserProperties, getPropertiesName, getPropertieInfo, deletePropertie, getPropertieRed, editRed, editAgent, propertiesAlquiler, propertiesCompra} from '../controllers/properties.controller.js'

const router = Router();

router.get('/getProperties', getProperties)
router.get('/getPropertiesName/:id', getPropertiesName)
router.get('/getInfoPropertie/:id', getPropertieInfo)
router.get('/getMyProperties/:id', getUserProperties)
router.get('/getPropertieRed', getPropertieRed)
router.get('/getPropertiesAlquiler/:id', propertiesAlquiler)
router.get('/getPropertiesCompra/:id', propertiesCompra)
router.post('/addPropertie', addPropertie)
router.put('/editPropertie/:id', editPropertie)
router.put('/changeStatusRed/:id', editRed)
router.put('/changeStatusAgent/:id', editAgent)
router.delete('/deletePropertie/:id', deletePropertie)

export default router
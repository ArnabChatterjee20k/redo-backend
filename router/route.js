import express from 'express'
import { login } from '../controllers/login.js'
import { signin } from '../controllers/signin.js'
const router = express.Router() 
router.post('/login',login)
router.post('/signin',signin)
export default router
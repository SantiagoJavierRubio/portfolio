import { Router } from 'express'
import { getEntries, getFeatured, visitEntry, likeEntry, sendEmail } from '../controllers/api'

const router = Router()

router.get('/entries/:id?', getEntries)
router.get('/featured', getFeatured)
router.put('/visit/:id', visitEntry)
router.put('/like/:id', likeEntry)
router.post('/contact', sendEmail)

export default router
import { Router } from 'express'
import adminControls from '../controllers/admin'

const router = Router()

router.get('/', adminControls.home)
router.post('/auth', adminControls.auth)
router.get('/logout', adminControls.logout)

export default router
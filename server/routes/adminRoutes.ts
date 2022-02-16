import { Router } from 'express'
import { home, auth, logout, checkSession } from '../controllers/adminAuth'
import { createNew, edit, getAll, getById, deleteById } from '../controllers/adminFuncs'

const router = Router()

// auth routes
router.get('/', home)
router.post('/auth', auth)
router.get('/logout', logout)

// function routes
router.get('/entries', checkSession, getAll)
router.post('/new_entry', checkSession, createNew)
router.get('/edit', checkSession, getById)
router.post('/edit', checkSession, edit)
router.delete('/edit/:id', checkSession, deleteById)


export default router
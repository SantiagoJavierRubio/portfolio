import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import url from 'url'
import SuperUser from '../models/superUser'

interface errorData {
    error: boolean,
    message: string | undefined
}

const home = (req: Request, res: Response) => {
    let errorMsg: string = ''
    if(req.query.authError == 'password'){
        errorMsg = "Incorrect password"
    } else if (req.query.authError == 'user') {
        errorMsg = "Invalid user"
    }

    let e: errorData = {error: false, message: undefined}
    if(errorMsg != '') {
        e = {error: true, message: errorMsg}
    }
    
    if(req.session.authorized){
        res.render('pages/admin.ejs')
    } else {
        res.render('pages/admin_login.ejs', {errorData: e})
    }
}

const auth = async (req: Request, res: Response) => {
    try{
        const userInput = req.body
        const admin = await SuperUser.findOne({"email": userInput.email})
        if(!admin) {
            return res.redirect(url.format({
                pathname: '/admin',
                query: {"authError": "user"}
            }))
        }
        bcrypt.compare(userInput.password, admin.password, (err, match) => {
            if(err) throw err
            if(!match) {
                return res.redirect(url.format({
                    pathname: '/admin',
                    query: {"authError": "password"}
                }))
            }
            req.session.authorized = true
            req.session.save(err => { if(err) throw err })
            res.redirect('/admin')
        })
    }catch(err){
        console.log(err)
        res.redirect('/admin')
    }
}

const logout = (req: Request, res: Response) => {
    try{
        req.session.destroy(err => { if(err) throw err })
        res.redirect('/admin')
    }catch(err){
        console.log(err)
        res.redirect('/admin')
    }
}

// const createSuperUser = async (req: Request, res: Response) => {
//     const data = req.body
//     try {
//        const salt = bcrypt.genSaltSync(10)
//        const hash = await bcrypt.hash(data.password, salt)
//        const admin = new SuperUser({
//            email: data.email,
//            password: hash
//        })
//        await admin.save()
//        res.sendStatus(200)
//     } catch(err) {
//         res.sendStatus(500)
//         console.log(err)
//     }
// }

export default {home, auth, logout}
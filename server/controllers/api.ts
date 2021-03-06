import { Request, Response, NextFunction } from "express"
import PortfolioItem from "../models/portfolioItem"
import transporter from "../nodemailer"
import "dotenv/config"

const getEntries = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id
        if(!id){
            const allEntries = await PortfolioItem.find({}, 'name summary langs position thumbnail description').sort({ position: 1})
            return res.send(allEntries)
        }
        const entryById = await PortfolioItem.findById(id)
        if(!entryById) return res.status(400).json({ error: 'Entry not found' })
        const isLiked: Boolean = req.session.likedEntries?.includes(`${id}`) || false
        res.send({entry: entryById, hasLiked: isLiked})
    } catch(err) {
        next(err)
    }
}

const getFeatured = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const featured = await PortfolioItem.find({}, 'name summary langs position thumbnail').sort({ position: 1}).limit(3)
        res.send(featured)
    } catch(err) {
        next(err)
    }
}

const visitEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const visited = await PortfolioItem.findByIdAndUpdate(id, { $inc: {visits: 1} })
        if(!visited) return res.status(400).json({ error: 'Entry not found' })
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
}

const likeEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const liked = await PortfolioItem.findByIdAndUpdate(id, { $inc: {likes: 1} })
        if(!liked) return res.status(400).json({ error: 'Entry not found' })
        if (req.session.likedEntries) {
            req.session.likedEntries = [ ...req.session.likedEntries, `${id}` ]
        } else {
            req.session.likedEntries = [`${id}`]
        }
        res.sendStatus(200)
    } catch(err) {
        next(err)
    }
}

const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const m = await transporter.sendMail({
            from: `Portfolio Administrator <${process.env.EMAIL_USER}>`,
            to: `${process.env.EMAIL_RECEIVER}`,
            subject: 'Someone contacted you from your portfolio website',
            text: `
                Message from: ${req.body.name || 'anonymus'} <${req.body.email}>: \n
                ${req.body.message}
            `
        })
        if(m.accepted.length > 0) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    } catch(err) {
        next(err)
    }
}

export { getEntries, getFeatured, visitEntry, likeEntry, sendEmail }
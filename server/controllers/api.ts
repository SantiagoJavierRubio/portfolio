import { Request, Response } from "express"
import PortfolioItem from "../models/portfolioItem"

const getEntries = async (req: Request, res: Response) => {
    const id = req.params.id
    if(!id){
        const allEntries = await PortfolioItem.find({}, 'name description langs position thumbnail').sort({ position: 1})
        return res.send(allEntries)
    }
    const entryById = await PortfolioItem.findById(id)
    res.send(entryById)
}

const getFeatured = async (req: Request, res: Response) => {
    const featured = await PortfolioItem.find({}, 'name description langs position thumbnail').sort({ position: 1}).limit(3)
    res.send(featured)
}
const visitEntry = async (req: Request, res: Response) => {
    const id = req.params.id
    const visited = await PortfolioItem.findByIdAndUpdate(id, { $inc: {visits: 1} })
    if(!visited) {
        // ADD ERROR CAT AND MNG LATER
        return res.sendStatus(400)
    }
    res.sendStatus(200)
}
const likeEntry = async (req: Request, res: Response) => {
    const id = req.params.id
    const liked = await PortfolioItem.findByIdAndUpdate(id, { $inc: {likes: 1} })
    if(!liked){
        // ADD ERROR CAT AND MNG LATER
        return res.sendStatus(400)
    }
    res.sendStatus(200)
}

export { getEntries, getFeatured, visitEntry, likeEntry }
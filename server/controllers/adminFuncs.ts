import { Request, Response } from 'express'
import PortfolioItem from '../models/portfolioItem'

const createNew = async (req: Request, res: Response) => {
    const userInput = req.body
    if(userInput.langs == '') delete userInput.langs
    userInput.siteUrl = curateUrl(userInput.siteUrl)
    userInput.gitUrl = curateUrl(userInput.gitUrl)
    try{
        const newEntry = new PortfolioItem(userInput)
        await newEntry.save()
        res.status(200)
        res.redirect('/admin')
    } catch (err) {
        console.log(err)
    }
}

const getAll = async (req: Request, res: Response) => {
    try {
        const allEntries = await PortfolioItem.find().sort('position')
        if(allEntries.length > 0) {
            // Separate languages to display list on front
            const languageEntries: object[] = allEntries.map((entry: any) => entry.langs)
            let langList: string[] = []
            languageEntries.forEach((lang: any) => {
                lang.forEach((l: string) => {
                    if(!langList.includes(l)) {
                        langList = [...langList, l]
                    }
                })
            })
            res.render('pages/admin.ejs', {entries: allEntries, langList})
        } else {
            res.render('pages/admin.ejs', {entries: null, langList: null})
        }
    } catch (err) {
        console.log(err)
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const id = req.query.id
        const entry = await PortfolioItem.findById(id)
        if(entry){
            res.render('pages/edit_entry.ejs', {entry})
        } else {
            res.sendStatus(404)
        }
    } catch(err) {
        console.log(err)
    }
}

const edit = async (req: Request, res: Response) => {
    try {
        const userInput = req.body
        if(!userInput.langs){
            userInput.langs = []
        }
        if(userInput.siteUrl) userInput.siteUrl = curateUrl(userInput.siteUrl)
        if(userInput.gitUrl) userInput.gitUrl = curateUrl(userInput.gitUrl)
        const edited = await PortfolioItem.findByIdAndUpdate(req.query.id, userInput)
        if(edited){
            res.redirect('/admin')
        } else {
            res.sendStatus(500)
        }
    } catch(err) {
        console.log(err)
    }
}

const curateUrl = (url: string): string => {
    if(url.includes('//')) return url
    return `//${url}`
}


export { createNew, getAll, getById, edit }
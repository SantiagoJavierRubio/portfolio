const home = (req: any, res: any) => {
    if(req.session.authorized){
        // change for render type with EJS
        res.sendFile('/public/admin_page.html')
    } else {
        res.sendFile('/public/admin_login.html')
    }
}

const auth = (req: any, res: any) => {
    const userInput = req.body
    console.log(userInput)
}

export default {home, auth}
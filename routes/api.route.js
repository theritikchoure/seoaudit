const express = require('express');
const router = express.Router();
const getInfo = require('../src/bloggingos');

module.exports = router;

// User CRUD Operation Routes
router.post('/', register); // Create A User

// Create A User
async function register(req, res, next) {
    try
    {
        console.log(req.body.url)
        const requrl = req.body.url;
        url = requrl.replace('http://www.', '').replace('https://www.', '').replace('http://', '').replace('https://', '').replace('com/', 'com');
        console.log(url)
        const audit = await getInfo(url);
        if(audit)
        {
            res.status(200).json({
                message: "Welcome to SEO Audit Created by Ritik",
                audit
            })
        }
        else
        {
            res.status(200).json({
                message: "Enter Valid URL or Try Again"
            })
        }
    }catch(e)
    {
        res.status(200).json({
            message: "Enter Valid URL or Try Again"
        })
    }
}
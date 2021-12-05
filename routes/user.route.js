const express = require('express');
const router = express.Router();
const getInfo = require('../src/bloggingos');

module.exports = router;

// User CRUD Operation Routes
router.get('/', home); //serving home page (index.js)
router.get('/audit/:url', audit); //serving audit report page (auditreport.js)

// Serving Home Page (index.js)
async function home(req, res, next) {
    res.render('index');
}

async function audit(req, res, next) {
    const requrl = req.params.url;
    url = requrl.replace('http://www.', '').replace('https://www.', '').replace('http://', '').replace('https://', '').replace('com/', 'com');
    console.log(url)
    let audit = await getInfo(url);

    if(audit)
    {
        const response = {
            message: `SEO Audit Report By Ritik for ${req.params.url}`,
            audit
        }
        res.render('auditreport', { response: response, status: 'success' });
    }else
    {
        res.render('auditreport', { status: 'fail' });
    }
}
const express = require('express');
const router = express.Router();
const getInfo = require('../src/bloggingos');

module.exports = router;

// User CRUD Operation Routes
router.get('/', home); //serving home page (index.js)
router.get('/audit', audit); //serving audit report page (auditreport.js)

// Serving Home Page (index.js)
async function home(req, res, next) {
    res.render('index');
}

async function audit(req, res, next) {
    res.render('auditreport');
}
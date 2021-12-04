const express = require('express'); // import express
var cookieParser = require("cookie-parser"); // import cookieParser
var bodyParser = require("body-parser"); 
const getInfo = require('./src/bloggingos');
var path = require('path');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setup public folder
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('index');  
});
// API URL Route
app.post('/api', async (req, res, next) => {
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
            message: "Axios Not Installed"
        })
    }
})

// Start Serverx
app.listen(process.env.PORT || 3000, function(err, result){
    if (err) console.log("Error in server setup");

    console.log("Server listening on Port");
});
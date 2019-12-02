const express = require('express');
const app = express();
// const fetchgithub = require('./worker/tasks/fetch-github');
require('dotenv').config();

const PORT = process.env.PORT;

app.get('/' , (req,res)=>{
    console.log('Working');
    res.json({
        "message":"I am working"
    })
});

app.listen(PORT,()=>{
    console.log(PORT);
    console.log('Working Fine');
});


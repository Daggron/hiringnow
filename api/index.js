const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');


const redis = require('redis');
client = redis.createClient();



const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);


app.use(cors());


const port = process.env.PORT || 5000;

app.get('/jobs' ,async  (req,res)=>{
    const raw = await getAsync('github');
    const jobs = JSON.parse(raw);
    res.json({
        data:jobs,
        length:jobs.length
    })
});

app.listen(port,()=>{
    console.log(`Working fine on port ${port}`);
});


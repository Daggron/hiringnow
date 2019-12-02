const redis = require('redis');
client = redis.createClient();

client.on('error',(err)=>{
    console.log('Error creating client for redis');
    console.log(err);
});

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

const axios = require('axios');
require('dotenv').config();

const baseUrl = process.env.JOBS ;



async function fetchGithub(){
    let resCount =1 , pageCount = 1;
    let jobsData = [];
    while(resCount>0){
        let res  = await axios.get(`${baseUrl}+${pageCount}`);
        let jobs = await res.data;
        jobsData.push(...jobs);
        console.log(`got ${jobs.length} jobs`);
        pageCount++;
        resCount = jobs.length;
       
    }
    console.log(jobsData.length);
    const success = await setAsync('github',JSON.stringify(jobsData));
    console.log({success});

}

module.exports = fetchGithub;

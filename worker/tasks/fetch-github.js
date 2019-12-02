const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const baseUrl = process.env.JOBS ;

let resCount =1 , pageCount = 1;
let jobsData = [];

module.exports = fetchjobs = async ( )=>{
    while(resCount>=1){
        let res  = await axios.get(`${baseUrl}+${pageCount}`);
        let jobs = await res.data;
        jobsData.push(...jobs);
        console.log(`got ${jobs.length} jobs`);
        pageCount++;
        resCount = jobs.length;
       
    }
    console.log(jobsData.length);
    let data = JSON.stringify(jobsData);
    fs.writeFileSync('./jobs.json',data);

}

module.exports();
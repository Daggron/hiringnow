const redis = require('redis');
client = redis.createClient();


const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

const axios = require('axios');
require('dotenv').config();

const baseUrl = 'https://jobs.github.com/positions.json?page=' ;



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

    const jrJobs = jobsData.filter(job=>{
        const jobTitle = job.title.toLowerCase();

        if(
            jobTitle.includes('senior')||
            jobTitle.includes('sr.')||
            jobTitle.includes('manager')||
            jobTitle.includes('architect')
        ){
            return false;
        }
        return true;
    });

    console.log('Filterdown the jobs to'+jrJobs.length);
    const success = await setAsync('github',JSON.stringify(jrJobs));
    console.log({success});

}

module.exports = fetchGithub;

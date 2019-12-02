
const cronJob = require('node-cron');
const fetchGithub = require('./tasks/fetch-github');

cronJob.schedule('* * * * *',()=>{
    console.log('runnig');
    fetchGithub();
})
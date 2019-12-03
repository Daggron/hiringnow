import React from 'react';
import './App.css';
import Jobs from './jobs';
import axios from 'axios';

const JOBS_URL = 'http://localhost:3000/jobs'

async function fetchJobs(updateCb){
      let response = await axios.get(JOBS_URL);
      let data  = await response.data.jobs

     await updateCb(data);
}



function App() {

  const  [ jobsList , updateJobs ] = React.useState([]);

   React.useEffect(()=>{
     fetchJobs(updateJobs);
  },[ ]);

  return (
    <div className="App">
        <Jobs jobs={jobsList}/>
    </div>
  );
}

export default App;

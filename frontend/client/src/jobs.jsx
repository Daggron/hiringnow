import React from 'react';
import Typography from '@material-ui/core/Typography';
import Job from './job';
import JobModal from './jobModal';

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';



export default function Jobs ({jobs}){

    //Pagination
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs/50)
    // console.log(numJobs);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const jobsOnPage = jobs.slice((activeStep *50) , (activeStep *50)+50);

    //Modal
    const [selectedJob , setSelectedJob] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const selectJob = (e)=>{
        // console.log(e)
        setSelectedJob(e);
    }
  
  
    return(
       <div className="jobs">
           <JobModal  open={open} job={selectedJob} handleClose={handleClose} />
           <Typography variant="h4" component="h1">
               Entry level software jobs
           </Typography>
           <Typography variant="h6" component="h2">
              Found {numJobs} jobs
           </Typography>
           
               {
                       jobsOnPage.map(
                                (job,index) => <Job key={index} job={job} onClick={ ()=>{
                                    handleClickOpen();
                                    selectJob(job)
                                } } />
                        )
                }

            <div>
               Page {activeStep+1} of {numPages  }
            </div>
                <MobileStepper
                    variant="progress"
                    steps={numPages}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                        Next
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                             <KeyboardArrowLeft />
                        Back
                        </Button>
                    }
                />
       </div>
    )
}
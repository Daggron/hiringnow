import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function jobModal({ job , open , handleClose }) {
    
    if(! job.title){
        return <div/>
    }

    function converter(e){
        return  {
            __html : e
        }
    }
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
            {job.title} - {job.company}
            <img className="job-image" src={job.company_logo} alt="company's  icon"/>
            <br/>
            {job.type}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"  dangerouslySetInnerHTML={converter(job.description)} />
        </DialogContent>
        <Typography variant="h5" component="h3">
                How To Apply
        </Typography>
        <DialogContentText id="alert-dialog-slide-description"  dangerouslySetInnerHTML={converter(job.how_to_apply)} />
        <DialogActions>
          <Button variant="contained"  onClick={handleClose} color="secondary">
            Close
          </Button>
          <a href={job.url} target="_blank" rel="noopener noreferrer">
            <Button variant="contained" onClick={handleClose} color="primary">
                 Apply
            </Button>
          </a>
        </DialogActions>
      </Dialog>
    </div>
  );
}
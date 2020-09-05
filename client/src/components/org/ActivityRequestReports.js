import React, { useState } from 'react';
import {
  Link,
} from "react-router-dom";

// Material-ui components 
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Navbar2 from "../layouts/Navbar2";

//Picture importing
import request from '../img/request.png';
import reports from '../img/reports.png'

const useStyles = makeStyles(theme => ({
  root:{
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
  },
  root2: {
   padding: theme.spacing(2),
  },
  card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
      link: {
        textDecoration: 'none'
      }
}));

function ActivityRequestReports(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const preventDefault = (event) => event.preventDefault();

  return (

    <div>

    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Send an organizational report"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your about to send a organization report to the admin. As default,
            your report submitted will archived. Proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>

           <Typography>
               <Link to="/org/sendArchive" className={classes.link}>
                  <Button color="primary" autoFocus>
                    Agree
                  </Button>

                </Link>
        </Typography>

        </DialogActions>
      </Dialog>

    <Navbar2 />

      <Container className={classes.root}>

        <Grid container spacing={3}>

            <Grid item xs={12} sm={6}>

              <Card className={classes.card}>

                <CardMedia
                  className={classes.cardMedia}
                  image={request}
                  title="Request Activities"
                />

                <CardContent className={classes.cardContent}>

                    <Typography gutterBottom variant="h5" component="h2">
                          Campus/Department Activity REQUEST
                    </Typography>

                    <Typography component="p">
                      Upload the documents of your request activities that to be
                      checked by your SOA Head of your campus and the SOA Director.

                      Submit it through here.
                  </Typography>

                </CardContent>

                <CardActions>
                    <Button href="/org/activitysections/requestactivities" size="small" variant="outlined" color="secondary">
                        File Request Activity
                    </Button>
                </CardActions>

              </Card>

            </Grid>

            <Grid item xs={12} sm={6}>
              
              <Card className={classes.card}>

                <CardMedia
                  className={classes.cardMedia}
                  image={reports}
                  title="Report Activities"
                />

                <CardContent className={classes.cardContent}>

                    <Typography gutterBottom variant="h5" component="h2">
                          Campus/Department Activity REPORTS
                    </Typography>

                  <Typography component="p">
                    Upload the Reports of the activities that 
                    already implemented on/off the campuse through here.    

                    The SOA Head of your campus will check. Once the reports is okay, 
                    Your reports will be featured in the students BatStateU for collective 
                    information.
                  </Typography>

                </CardContent>

                <CardActions>
                     <Button onClick={_ => setOpen(true)} size="small" variant="outlined" color="secondary">
                        Submit an Activity Report
                    </Button>
                </CardActions>

              </Card>

            </Grid>

        </Grid>

      </Container>

    </div>

  );
}


export default ActivityRequestReports;
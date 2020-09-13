import React from 'react';
import {
  Link,
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';  

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import reports from '../img/reports.png';
import fileSharing from '../img/files-sharing.jpg';

//Admin Dashboard Component
import DashboardAdmin from '../layouts/DashboardAdmin';

const useStyles = makeStyles(theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
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

function FilesAndReports(props){

        const classes = useStyles();

        return (
            <div>
                <DashboardAdmin>

                        <div className={classes.root}>

                            <Grid container spacing={3}>

                                <Grid item sm={6} xs={12}>
                                    <Card className={classes.card}>

                                        <CardMedia
                                          className={classes.cardMedia}
                                          image={reports}
                                          title="Organizational Reports"
                                        />

                                        <CardContent className={classes.cardContent}>

                                            <Typography gutterBottom variant="h5" component="h2">
                                                  University Organizational Reports
                                            </Typography>

                                            <Typography component="p">
                                                The archived reports of each student organization in the university.
                                                Only you as an admin can see it.
                                          </Typography>

                                        </CardContent>

                                        <CardActions>
                                            <Link to="/ad/filesandreports/viewArchivedReports" className={classes.link}>
                                                <Button size="small" variant="outlined" color="secondary">
                                                    View Reports
                                                </Button>
                                            </Link>
                                        </CardActions>
                                        
                                    </Card>
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <Card className={classes.card}>

                                        <CardMedia
                                          className={classes.cardMedia}
                                          image={fileSharing}
                                          title="Organizational Reports"
                                        />

                                        <CardContent className={classes.cardContent}>

                                            <Typography gutterBottom variant="h5" component="h2">
                                                  File Sharing
                                            </Typography>

                                            <Typography component="p">
                                                Share downloadable files in all students and 
                                                student organization of the university
                                          </Typography>

                                        </CardContent>

                                        <CardActions>
                                         <Link to="/ad/filesandreports/shareFiles" className={classes.link}>
                                                <Button size="small" variant="outlined" color="secondary">
                                                    Share Files
                                                </Button>
                                            </Link>
                                        </CardActions>
                                        
                                    </Card>
                                </Grid>

                          </Grid>

                        </div>
                        

                </DashboardAdmin>
            </div>
        )
    
}

export default FilesAndReports;

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

import DashBoardHead from '../layouts/DashboardHead';

// Object Styles for the components 
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
      },
      closeIcon: {
          float: 'right',
          color: 'red'
      },
      formControl: {
        // margin: theme.spacing.unit,
        minWidth: '100% ',
      },
      submit:{
        marginTop: theme.spacing(3),
      },
      close: {
          padding: theme.spacing() / 2,
      }
});

function AddFound(props){

    const classes = props;

console.log(props);
  return (
     <DashBoardHead>

      <Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
        <Link color="inherit" href="/h/lostandfound" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Menu
        </Link>

        <Link
          color="inherit"
          href="/h/lostandfound/foundreports"
          aria-current="page"
          className={classes.link}
        >
        <FindReplaceIcon className={classes.icon}/>
          Lost Reports
        </Link>
        <Link
          color="textPrimary"
          href="/h/lostandfound/foundreports/addfoundrecord"
          aria-current="page"
          className={classes.link}
        >
        <ListAltIcon className={classes.icon} />
          Add
        </Link>
    </Breadcrumbs>

        {/* Main Component for the form of AddFound */}
         <div className={classes.root}>    
            
                <main className={classes.layout}>
                    <Paper className={classes.paper}>

                        <Typography variant="h4" align="center">
                            Lost Item Report Form
                        </Typography>
                        <br></br>

                <Container maxWidth="md">
                        <Typography variant="h6">
                            Input the details needed.
                        </Typography>

                        <form noValidate>

                        <Grid container spacing={3}>

                            {/* Ful Name Text Fiel  */}
                        <Grid item xs={12} md={12}>
                                <TextField
                                    id="findername"
                                    name="findername"
                                    label="Founder Name"
                                    fullWidth
                                    autoComplete="findername"
                                />
                           
                                </Grid>

                          <Grid item xs={12} md={12}>
                                <TextField
                                    id="founditem"
                                    name="founditem"
                                    label="Found Item"
                                    fullWidth
                                    autoComplete="founditem"
                                />
                           
                                </Grid>
                               

                        </Grid>

                        </form>



                </Container>
                    </Paper>
                </main>

            </div>
      </DashBoardHead>
  )
};

AddFound.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddFound);
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//Admin Dashboard Component
import DashboardAdmin from '../layouts/DashboardAdmin';

// Object Styles for the components 
const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
         ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
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
      },
         link: {
    display: 'flex',
  },
   icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));


function AdminIndex(props){
        const classes = styles();
        return (
            <div>
                <DashboardAdmin>
                    <Paper className={classes.root}>
                       
                                <Container maxWidth="lg">

                                    <form noValidate>

                                        <Grid item xs={12}>
                                        <TextField 
                                            id="name"
                                            name="name"
                                            label="Name of the student"
                                            fullWidth
                                            autoComplete
                                        />
                                        </Grid>

                                    </form>

                                </Container>

                    </Paper>
                </DashboardAdmin>
            </div>
        )
    
}

export default AdminIndex;

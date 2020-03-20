import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Navbar from "../layouts/Navbar";
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

// Material UI styles 
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
  
    
});


class LostAndFoundContent extends Component {

    render(){
        const { classes } = this.props;
        return(
            <div>
            <Navbar />

                <Container style={{paddingTop: 20}}>
                    <Paper className={classes.root} elevation={10}>
                        

                    <Grid container spacing={24} justify="center">
                        <Grid item xs style={{marginRight: "2em"}}>
                        <Paper className={classes.paper}>
                            File Report
                        </Paper>
                        </Grid>
                        <Grid item xs style={{marginRight: "2em"}}>
                        <Paper className={classes.paper}>
                            Lost Item Reports
                        </Paper>
                        </Grid>
                        <Grid item xs >
                        <Paper className={classes.paper}>
                            Found Item Reports
                        </Paper>
                        </Grid>
                    </Grid>

                    </Paper>
                </Container>

            </div>
        );
    }
}

LostAndFoundContent.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LostAndFoundContent);

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Navbar from "../layouts/Navbar";
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import lostandfound from '../img/640x640_12988565.png';
import lost from '../img/download.png';
import found from '../img/images.png';

// Material UI styles 
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    paper: {
        textAlign: 'center',
        height: 400,
    },
    cardGrid: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
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
    
});


class LostAndFoundContent extends Component {

    render(){
        const { classes } = this.props;
        return(
            <div>
            <Navbar />
                {/* Main paper  */}
                <Container style={{paddingTop: 20}}>
                    <Paper className={classes.root} elevation={10}>
                        
                    {/* Optional Paper  */}
                        <Container className={classes.cardGrid} maxWidth="md">
                            <Grid container spacing={4} justify="center">
                                {/* Paper 1 */}
                                    <Grid item xs={12} sm={6} md={4}>
                                         <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={lostandfound}
                                                title="Image title"
                                            />
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                File Lost Items
                                                </Typography>
                                                <Typography>
                                                File your personal belongings that you lost within school campus here. So we can have a chance to recover your lost item and give it back to you.
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" variant="outlined" color="secondary">
                                                File a Report
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                {/* Paper 2 */}
                                <Grid item xs={12} sm={6} md={4}>
                                         <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={lost}
                                                title="Image title"
                                            />
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                View Lost Item Reports 
                                                </Typography>
                                                <Typography>
                                                A page for all the lost items being reported. You can track your filed item reports here or you can helped others in returning back their personal belongings here.
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                               <Button size="small" variant="outlined" color="secondary">
                                                View Lost Item Reports
                                                </Button>
                                            </CardActions>
                                        </Card>
                                        
                                </Grid>
                                {/* Paper 3 */}
                                <Grid item xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={found}
                                                title="Image title"
                                            />
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                View Found Item Reports
                                                </Typography>
                                                <Typography>
                                                A page were all the reported found items inside a university campus being returned to the lost and found management. Check it here to see if one of your reported lost item is here.
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                            <Button size="small" variant="outlined" color="secondary">
                                                View Found Item Reports
                                                </Button>
                                            </CardActions>
                                        </Card>
                                </Grid>

                            </Grid>
                        </Container>

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

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import lostandfound from '../img/640x640_12988565.png';
import found from '../img/images.png';

// Dashboard Component  
import DashBoardHead from '../layouts/DashboardHead';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
   card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
}));

const LostOrFound = (props) => {

	  const classes = useStyles();

  return (
    <DashBoardHead className={classes.root}>

         <Typography variant="h4" gutterBottom>
            Lost and Found
          </Typography>

		    <Grid container spacing={3}>
		    	{/*For lost component grid */}
		    	<Grid item xs={12} sm={6}>

		 			  <Card className={classes.card}>
                                   <CardMedia
                                         className={classes.cardMedia}
                                         image={lostandfound}
                                         title="Image title"
                                       />
                                            {/* This Content will be for the lost and found form content  */}
                                 <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                Lost Item Reports
                                                </Typography>
                                                <Typography>
                                                Check Lost Item Reports from your campus
                                                </Typography>
                                 </CardContent>
                                   <CardActions>
                                                <Button href="/h/lostandfound/lostreports" size="small" variant="outlined" color="secondary">
                                                Check Reports
                                                </Button>
                                   </CardActions>
                        </Card>

		        </Grid>

		    	{/*For found component grid */}
		        <Grid item xs={12} sm={6}>

		         <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={found}
                                                title="Image title"
                                            />
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                Record Found Item Reports
                                                </Typography>
                                                <Typography>
                                                Record a found item inside your campus
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                            <Button size="small" variant="outlined" color="secondary">
                                                Input Found Item Reports
                                                </Button>
                                            </CardActions>
                                        </Card>
		   

		        </Grid>

		     </Grid>
    </DashBoardHead>
  )
}

export default LostOrFound;
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { addActivityAssessmentFalse } from '../../actions/assessmentActions';
import { connect } from 'react-redux';

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import CircularProgress from '@material-ui/core/CircularProgress';

import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import Navbar2 from "../layouts/Navbar2";
import FormConfirmationMsg from './FormConfirmationMsg';

//Header of the Table
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgb(138, 28, 28)',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

// Style for TablePaginationActions Component 
const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },

}));

// Table Functions for table pagination 
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  // Table Pagination Component 
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

// Material UI styles 
const useStyles = makeStyles(theme => ({
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
      },
    input: {
        display: 'none',
      },
    timeFeed: {
      float: 'right',
      fontSize: 13
    },
    tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
}));

function Assessment(props) {
  const classes = useStyles();
    
    // Pagination Controls addAnnouncementFalseHead
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [activities, getActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ifError, setIfError] = useState(false);

    const [added, setAdded] = useState(false);  

    //Event Handlers
    const handleChangePage = (event, newPage) => {
           setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
         setRowsPerPage(parseInt(event.target.value, 10));
         setPage(0);
     };

              // Event for added state 
    const handleClose = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setAdded(false);
                props.addActivityAssessmentFalse();
     };

     // Component Effects 
     useEffect(_ => {
     	axios.get('/api/assessments/')
     	.then(res => {
     		getActivities(res.data);
     		setLoading(false);
     	})
     	.catch(err => {
     		if(err){
     			setLoading(false);
     			setIfError(true);

     		}
     	})
     },[]);

     useEffect(_ => {
     	if(props.assessment.added)
     		setAdded(true);

     	setTimeout(function(){ props.addActivityAssessmentFalse() }, 6000);
     },[props.assessment.added]);

    const { user } = props.auth;

    const rows = activities.sort((a, b) => a.date > b.date ? -1 : 1)
    			.filter(row => row.username === user.username);

    //Empty row that says the rows for paginationaddAnnouncementFalseHead
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    // console.log(props);
  return (
    <div>
    	<Navbar2 />

    		<FormConfirmationMsg open={added} onClose={handleClose} variant="success" message="Activity Assessment Added."  />

    		<Container style={{paddingTop: 10}}>

    		  <Button 
                        href="/org/assessment/addActivity"
                        className={classes.button}
                        variant="outlined" 
                        color="secondary"
                        >
                        Add Activity
                    </Button>
                    <br />

    			<Paper className={classes.root} elevation={10} >
    				
					<div className={classes.tableWrapper}>

                            <Table className={classes.table} aria-label="custom pagination table">
                            {/* Table Head of the datas  */}
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Activity Title</StyledTableCell>
                                <StyledTableCell align="left">Date of Activity</StyledTableCell>
                                <StyledTableCell align="left">Requirements needed</StyledTableCell>
                                <StyledTableCell align="left">Description of the Activity</StyledTableCell>
                                <StyledTableCell align="left">Action</StyledTableCell>

                              </TableRow>
                            </TableHead>

                          {/* Body for displaying the reports */}
                                <TableBody>
                                  { loading 
                                    ? 
                                      //When the data is still loading
                                      <TableRow>
                                      <TableCell rowSpan={5} colSpan={8} style={{textAlign: 'center',}}>
                                        <CircularProgress color="secondary" /><br/>
                                        <span>Loading ...</span>
                                      </TableCell>
                                    </TableRow>
                                    :  
                                    <Fragment>
                                     {
                                      ifError
                                      ?
                                      <TableRow>
                                      <TableCell rowSpan={5} colSpan={8} style={{textAlign: 'center',}}>
                                        <span>Something went wrong. Please try again.</span>
                                      </TableCell>
                                    </TableRow>
                                    :
                                    //Data to be displayed when the data is fetched
                                      (rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                      )
                                      .map(row => (
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            {row.activity}
                                          </TableCell>
                                          <TableCell align="left">{moment(row.dateDate).format('MMMM D YYYY')}</TableCell>
                                          <TableCell align="left">{row.activityRequirements}</TableCell>
                                          <TableCell align="left">{row.description}</TableCell>
                                          <TableCell align="left">
                                          {
                                          	row.status === 'pending'
                                          	?
                                          		<Fragment>
                                          			Pending... 
                                          			 <CircularProgress color="secondary" size={20}/>
                                          		</Fragment>
                                          	:
                                          	<Fragment>
                                          		{
                                          			row.status === 'approved'
                                          			?
                                          			<a>
                                          				Check students who joined...
                                          			</a>
                                          			:
                                          			<Fragment>
                                                    	Your activity is declined for implementation,
                                                    	maybe change the prequisites or the date of the 
                                                    	activity. <a>Edit Assessment</a>
                                                	</Fragment>
                                          		}
                                          	</Fragment>
                                          }

                                                
                                              {/*
                                              <Tooltip title="Delete" placement="top">
                                                 <IconButton onClick={_ => handleDelete(row.id)} aria-label="edit" color="secondary">
                                                  <DeleteIcon />
                                                </IconButton>
                                              </Tooltip>   
                                               */ }
                                          </TableCell>
                                        </TableRow>
                                      ))
                                    
                                    }
                                    </Fragment>
                                    
                                  }

                                  {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                      <TableCell colSpan={6} />
                                    </TableRow>
                                  )}
                                </TableBody>
                                <TableFooter>
                                  <TableRow>

                                    {/* Table Pagination controls  */}
                                    <TablePagination
                                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                      colSpan={3}
                                      count={rows.length}
                                      rowsPerPage={rowsPerPage}
                                      page={page}
                                      SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                      }}
                                      onChangePage={handleChangePage}
                                      onChangeRowsPerPage={handleChangeRowsPerPage}
                                      ActionsComponent={TablePaginationActions}
                                    />

                                  </TableRow>
                                </TableFooter>
                              </Table>

                        </div>


    			</Paper>


    		</Container>
    </div>
  )
}

const mapStateToProps = state => ({
	assessment: state.assessment,
	auth: state.auth,
});

const mapDispatchToProps = { addActivityAssessmentFalse };

export default connect(mapStateToProps, mapDispatchToProps)(Assessment);
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import UndoIcon from '@material-ui/icons/Undo';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import AssessmentIcon from '@material-ui/icons/Assessment';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Slide from '@material-ui/core/Slide';
// import CancelIcon from '@material-ui/icons/Cancel';
// import UndoIcon from '@material-ui/icons/Undo';

import Navbar2 from "../layouts/Navbar2";
import FormConfirmationMsg from './FormConfirmationMsg';

const Transition = props => {
    return <Slide direction="up" {...props} />
}

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

function CheckRegisteredStudentsOrg(props) {

	const classes = useStyles();

	    // Pagination Controls addAnnouncementFalseHead
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

       //Data States
    const [students, getStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ifError, setIfError] = useState(false);

    //Who's organization is online
	const [orgOnline, setOrgOnline] = useState('');

    //Modal State
    const [openModalState, setOpenModalState] = useState(false);
    const [id, getId] = useState(null);

    //Confirmation State
    const [complete, setComplete] = useState(false);
    const [undo, setUndo] = useState(false);

        //Filter State
    const [filter, setFilter] = useState('');

          //Event Handlers
    const handleChangePage = (event, newPage) => {
           setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
         setRowsPerPage(parseInt(event.target.value, 10));
         setPage(0);
     };

     //Modal
     const setFullRequirements = id => {
     	getId(id);
     	setOpenModalState(true);
     }
     const handleModalClose = _ => {
     	setOpenModalState(false);
     }

     //Undo Event
     const undoEvent = id => {
     	const { auth } = props;

     	const statusBody = {
     		status: 'pending'
     	};

     	axios.post(`/api/registeredStudents/setStudentStatus/${id}`, statusBody)
     	.then(res => {
     		setUndo(true);
     	})
     	.catch(err => console.log(err))

     	const newOrgFeed = {
     		username: auth.user.username,
     		orgname: orgOnline,
     		message: `You've undo an action in assessment page.`
     	}

     	axios.post(`/api/registeredStudents/sendOrgFeed`, newOrgFeed)
     	.then(res => res)
     	.catch(err => console.log(err));


     }
       const closeUndo = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setUndo(false);
          };


     // Final Confirmation
     const completeRequiremenFinal = _ => {
     	const { auth } = props;

     	const statusBody = {
     		status: 'complete'
     	}

     	const newOrgFeed = {
     		username: auth.user.username,
     		orgname: orgOnline,
     		message: `You've set a student as COMPLETE REQUIREMENTS`
     	}

     	axios.post(`/api/registeredStudents/setStudentStatus/${id}`, statusBody)
     	.then(res => {
     		setComplete(true);
     		setOpenModalState(false);
     	})
     	.catch(err => console.log(err));

     	axios.post(`/api/registeredStudents/sendOrgFeed`, newOrgFeed)
     	.then(res => res)
     	.catch(err => console.log(err));


     }
     const closeComplete = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setComplete(false);
          };

     // Component Effects 
     useEffect(_ => {
        axios.get(`/api/registeredStudents/seeRegisteredStudents/${props.match.params.activityId}/${props.match.params.activityTitle}`)
        .then(res => {
            getStudents(res.data);
            setLoading(false);
        })
        .catch(err => {
            if(err){
                setLoading(false);
                setIfError(true);

            }
        })
     },[complete, undo]);

     useEffect(_ => {
		const { auth } = props;

        axios.get('/api/org/getorgaccnts')
        .then(res => {
          res.data.filter(org => auth.user.username === org.username)
          .map(org => setOrgOnline(org.orgname))
        })
        .catch(err => console.log(err))

	},[]);

     const rows = students.sort((a, b) => a.created_at > b.created_at ? -1 : 1);

    //Empty row that says the rows for paginationaddAnnouncementFalseHead
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    // console.log(students);

    return (
    		<div>
    			<Navbar2 />
                
                <FormConfirmationMsg open={complete} onClose={closeComplete} variant="success" message="Student set to complete requirements."  />
                <FormConfirmationMsg open={undo} onClose={closeUndo} variant="info" message="Undo action."  />


    			 <Dialog
                   open={openModalState}
                   TransitionComponent={Transition}
                   keepMounted
                   onClose={handleModalClose}
                   aria-labelledby="alert-dialog-slide-title"
                   aria-describedby="alert-dialog-slide-description"
                   >
                       <DialogTitle id="alert-dialog-slide-title">
                           {"Approved Activity Assessment"}
                        </DialogTitle>

                        <DialogContent>

                          <DialogContentText id="alert-dialog-slide-description">
                              Are you sure this student is complete at requirements?
                              </DialogContentText>
                          </DialogContent>  

                          <DialogActions>
                            <Button onClick={completeRequiremenFinal} variant="outlined" color="primary">
                              Yes
                            </Button>
                            <Button onClick={handleModalClose} variant="outlined" color="secondary">
                              No
                            </Button>
                          </DialogActions>
                   </Dialog>

    		<Container style={{paddingTop: 10}}>

    		<Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
                <Link color="inherit" href="/org/assessment" className={classes.link}>
                  <AssessmentIcon className={classes.icon} />
                  Activities
                </Link>

                 <Link
                  color="textPrimary"
                  href={``}
                  aria-current="page"
                  className={classes.link}
                >
                <EventNoteIcon className={classes.icon} />
                  Students who join
                </Link>
            </Breadcrumbs>

    			<Paper className={classes.root} elevation={10} >

    			 <Grid container spacing={3}>

                 <Grid item xs={8}>
                  <TextField 
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    id="filter"
                    name="Filter"
                    label="Search by Name"
                    fullWidth
                    autoComplete
                    variant="outlined"
                      />
                    
                  </Grid>

                    </Grid>
                    <br />
                    <br />
    				
					<div className={classes.tableWrapper}>

						  <Table className={classes.table} aria-label="custom pagination table">
                            {/* Table Head of the datas  */}
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Student Name</StyledTableCell>
                                <StyledTableCell align="left">Date Registered</StyledTableCell>
                                <StyledTableCell align="left">SR-Code</StyledTableCell>
                                <StyledTableCell align="left">Department</StyledTableCell>
                                <StyledTableCell align="left">College Year</StyledTableCell>
                                <StyledTableCell align="left">Section</StyledTableCell>
                                <StyledTableCell align="left">Contact Number</StyledTableCell>
                                <StyledTableCell align="left">Complete Requirements ?</StyledTableCell>


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
                                    <Fragment>
                                    {
                                      rows.length === 0 
                                      ?
                                      <TableRow>
                                      <TableCell rowSpan={5} colSpan={8} style={{textAlign: 'center',}}>
                                        <span>No registered students for this activity.</span>
                                      </TableCell>
                                    </TableRow>

                                    :
                                    //Data to be displayed when the data is fetched
                                      (rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                      )
                                      .filter(row => row.studentName.toLowerCase().search(filter.toLowerCase()) !== -1 )
                                      .map(row => (
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            {row.studentName}
                                          </TableCell>
                                          <TableCell align="left">{moment(row.created_at).format('MMMM D YYYY')}</TableCell>
                                          <TableCell align="left">{row.srCode}</TableCell>
                                          <TableCell align="left">{row.department}</TableCell>
                                          <TableCell align="left">{row.yr}</TableCell>
                                          <TableCell align="left">{row.section}</TableCell>
                                          <TableCell align="left">{row.contactNumber}</TableCell>

                                          <TableCell align="left">

                                          {
                                            row.status === 'pending'
                                            ?
                                            <Fragment>
                                            Click the check button ONLY if the students is complete at requirements
                                            <Tooltip title="Yes" placement="top">
                                                 <IconButton onClick={_ => setFullRequirements(row.id)} aria-label="edit" style={{color: 'green'}}>
                                                  <CheckCircleIcon />
                                                </IconButton>
                                              </Tooltip> 
                                           </Fragment>
                                              :
                                              <Fragment>
                                              <p>
                                              Student is complete in requirements
                                              </p>
                                              If you feel you click the wrong one, click undo.
                                                 <IconButton onClick={_ => undoEvent(row.id)} aria-label="edit" color="primary">
                                                                  <UndoIcon />
                                                                </IconButton>
                                              </Fragment>
                                          }

                                          </TableCell>
                                        </TableRow>
                                      ))

                                    }
                                    </Fragment>
                                    
                                    
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
    	);
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(CheckRegisteredStudentsOrg);
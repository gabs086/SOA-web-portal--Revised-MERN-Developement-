import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { setAsApproved, setAsApprovedFalse, setAsDeclined, setAsDeclinedFalse,
        setAgainToPending, setAgainToPendingFalse } from '../../actions/assessmentActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import UndoIcon from '@material-ui/icons/Undo';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

import Slide from '@material-ui/core/Slide';

import DashBoardHead from '../layouts/DashboardHead';
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

function ActivityAssessment(props){
    const classes = useStyles();

        // Pagination Controls addAnnouncementFalseHead
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [activities, getActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ifError, setIfError] = useState(false);

    //Bodies
    const [id, setId] = useState(null);
    const [username, setUserName] = useState('');
    const [orgname, setOrgName] = useState('');
    const [notification, setNotif] = useState('');
    const [reason, setReason] = useState('');

    const [approvedModal, openApprovedModal] = useState(false);
    const [declinedModal, openDeclinedModal] = useState(false);
    const [pendingModal, openPendingModal] = useState(false);

    //Confimation States
    const [approve, setApprove] = useState(false);
    const [declined, setDeclined] = useState(false);
    const [pending, setPending] = useState(false);

        //Event Handlers
    const handleChangePage = (event, newPage) => {
           setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
         setRowsPerPage(parseInt(event.target.value, 10));
         setPage(0);
     };

     //Modal Events
     const handleApproved = (id, username, orgname, notif ) => {
         setId(id);
         setUserName(username);
         setOrgName(orgname);
         setNotif(notif);

         openApprovedModal(true);
     };
    const handleApprovedModalClose = _ =>  {
          openApprovedModal(false);
    }
    const handleDeclined = (id, username, orgname, notif) => {
        setId(id);
        setUserName(username);
        setOrgName(orgname);
        setNotif(notif);

        openDeclinedModal(true);
    }
    const handleDeclinedModalClose = _ => {
        openDeclinedModal(false);
    }
    const handlePending = (id, username, orgname, notif) => {
        setId(id);
        setUserName(username);
        setOrgName(orgname);
        setNotif(notif);

        openPendingModal(true);
    }
    const handlePendingModalClose = _ => {
        openPendingModal(false);
    }

    // Event for closing approved confimation msg
    const handleCloseApproved = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setApprove(false);
                props.setAsApprovedFalse();
          };
    const handleClosedDeclined = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setDeclined(false);
                props.setAsDeclinedFalse();
          };
    const handleClosedPending = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setPending(false);
                props.setAgainToPendingFalse();
          };

    //Final Confirmation Event
    const approvedFinal = _ => {
        const approvedBody = {
            status: 'approved'
        }

        const notifBody = {
            username,
            orgname,
            notification: `Your activity ${notification} has been approved. You may now check the students who will join the activity`
        }

        // console.log(id, approvedBody, notifBody);
        props.setAsApproved(id, approvedBody, notifBody);
        openApprovedModal(false);
    }
    const declinedFinal = _ => {
        const declinedBody = {
          status: 'declined'
        }

        const notifBody = {
          username,
          orgname,
          notification: `Your activity ${notification} has been declined.`,
          reason,
        }

        // props.setDeclinedHead(id, declinedBody, notifBody);
        openDeclinedModal(false);
        // console.log(id, declinedBody, notifBody);
        props.setAsDeclined(id, declinedBody, notifBody);
      }
    const pendingFinal = _ => {
         const pendingBody = {
          status: 'pending'
        }

        const notifBody = {
          username,
          orgname,
          notification: `Your activity ${notification} has been undo it's status.`,
        }

        openPendingModal(false);
        // console.log(id, pendingBody, notifBody);
        props.setAgainToPending(id, pendingBody, notifBody);
    }

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
     },[props.assessment.approved, props.assessment.declined, props.assessment.pendingAgain]);

     //Effects in Confirmations
     useEffect(_ => {
        if(props.assessment.approved)
            setApprove(true)

      setTimeout(function(){ props.setAsApprovedFalse() }, 6000);
     },[props.assessment.approved]);

      useEffect(_ => {
        if(props.assessment.declined)
            setDeclined(true)

      setTimeout(function(){ props.setAsApprovedFalse() }, 6000);
     },[props.assessment.declined]);

    useEffect(_ => {
        if(props.assessment.pendingAgain)
            setPending(true)

        setTimeout(function(){ props.setAgainToPendingFalse() }, 6000);
    },[props.assessment.pendingAgain])

    const { user } = props.auth;

    const rows = activities.sort((a, b) => a.date > b.date ? -1 : 1)
                .filter(row => row.campus === user.campus);

    //Empty row that says the rows for paginationaddAnnouncementFalseHead
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    // console.log(rows);

        return (
            <div>
                <DashBoardHead>

                <FormConfirmationMsg open={approve} onClose={handleCloseApproved} variant="success" message="Activity Accepted."  />
                <FormConfirmationMsg open={declined} onClose={handleClosedDeclined} variant="success" message="Activity Declined."  />
                <FormConfirmationMsg open={pending} onClose={handleClosedPending} variant="info" message="Activity Undo."  />


                {/* For Approved Modal */}

                   <Dialog
                   open={approvedModal}
                   TransitionComponent={Transition}
                   keepMounted
                   onClose={handleApprovedModalClose}
                   aria-labelledby="alert-dialog-slide-title"
                   aria-describedby="alert-dialog-slide-description"
                   >
                       <DialogTitle id="alert-dialog-slide-title">
                           {"Approved Activity Assessment"}
                        </DialogTitle>

                        <DialogContent>

                          <DialogContentText id="alert-dialog-slide-description">
                              Are you sure to approve this activity assessment?
                              </DialogContentText>
                          </DialogContent>  

                          <DialogActions>
                            <Button onClick={approvedFinal} variant="outlined" color="primary">
                              Yes
                            </Button>
                            <Button onClick={handleApprovedModalClose} variant="outlined" color="secondary">
                              No
                            </Button>
                          </DialogActions>
                   </Dialog>

                    {/* For Declined Modal */}
                      <Dialog
                       open={declinedModal}
                       TransitionComponent={Transition}
                       keepMounted
                       onClose={handleDeclinedModalClose}
                       aria-labelledby="alert-dialog-slide-title"
                       aria-describedby="alert-dialog-slide-description"
                       >
                           <DialogTitle id="alert-dialog-slide-title">
                               {"Declined Activity"}
                            </DialogTitle>

                            <DialogContent>

                              <DialogContentText id="alert-dialog-slide-description">
                                  Are you sure to decline this activity assessment? Tell the reason why?
                                  </DialogContentText>
                                    <TextField
                                    onChange={e => setReason(e.target.value)}
                                    autoFocus
                                    margin="dense"
                                    id="reason"
                                    label="Reason"
                                    type="text"
                                    fullWidth
                                  />
                              </DialogContent>  

                              <DialogActions>
                                <Button onClick={declinedFinal} variant="outlined" color="primary">
                                  Yes
                                </Button>
                                <Button onClick={handleDeclinedModalClose} variant="outlined" color="secondary">
                                  No
                                </Button>
                              </DialogActions>
                       </Dialog>

                    {/* For Pending Modal */}
                      <Dialog
                           open={pendingModal}
                           TransitionComponent={Transition}
                           keepMounted
                           onClose={handlePendingModalClose}
                           aria-labelledby="alert-dialog-slide-title"
                           aria-describedby="alert-dialog-slide-description"
                           >
                               <DialogTitle id="alert-dialog-slide-title">
                                   {"Undo Activity Assessment"}
                                </DialogTitle>

                                <DialogContent>

                                  <DialogContentText id="alert-dialog-slide-description">
                                      Your about to undo a activity assessment by an organization.
                                      Are you sure about this?
                                      </DialogContentText>
                                  </DialogContent>  

                                  <DialogActions>
                                    <Button onClick={pendingFinal} variant="outlined" color="primary">
                                      Yes
                                    </Button>
                                    <Button onClick={handlePendingModalClose} variant="outlined" color="secondary">
                                      No
                                    </Button>
                                  </DialogActions>
                           </Dialog>

                     <Paper className={classes.root}>
                            
                        <div className={classes.tableWrapper}>

                            <Table className={classes.table} aria-label="custom pagination table">
                            {/* Table Head of the datas  */}
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Activity Title</StyledTableCell>
                                <StyledTableCell align="left">Date of Activity</StyledTableCell>
                                <StyledTableCell align="left">By</StyledTableCell>
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
                                          <TableCell align="left">{row.createdBy}</TableCell>
                                          <TableCell align="left">{moment(row.dateDate).format('MMMM D YYYY')}</TableCell>
                                          <TableCell align="left">{row.activityRequirements}</TableCell>
                                          <TableCell align="left">{row.description}</TableCell>
                                          <TableCell align="left">
                                          {
                                            row.status === 'pending'
                                            ?
                                            <Fragment>
                                              <Tooltip title="Accept" placement="top">
                                                 <IconButton onClick={_ => handleApproved(row.id, row.username, row.createdBy, row.activity)} aria-label="edit" style={{color: 'green'}}>
                                                  <CheckCircleIcon />
                                                </IconButton>
                                              </Tooltip> 
                                              |
                                              <Tooltip title="Decline" placement="top">
                                                 <IconButton onClick={_ => handleDeclined(row.id, row.username, row.createdBy, row.activity)} aria-label="edit" color="secondary">
                                                  <CancelIcon />
                                                </IconButton>
                                              </Tooltip> 

                                              </Fragment>
                                            :
                                            <Fragment>
                                                {
                                                    row.status === 'finished'
                                                    ?
                                                    <span>
                                                        This activity is already finished
                                                    </span>
                                                    :
                                                                 <Fragment>
                                                                    {
                                                                row.status === 'approved'
                                                                ?
                                                                <Fragment>
                                                                <Link>
                                                                    Check students who joined...
                                                                </Link>
                                                                <br />
                                                                     Change your mind? Click the icon.
                                                                 
                                                                <IconButton onClick={_ => handlePending(row.id, row.username, row.createdBy, row.activity)} aria-label="edit" color="primary">
                                                                  <UndoIcon />
                                                                </IconButton>

                                                                </Fragment>
                                                                :
                                                                <Fragment>
                                                                    You declined this activity,
                                                                    Change your mind? Click the icon.
                                                                 
                                                                <IconButton onClick={_ => handlePending(row.id, row.username, row.createdBy, row.activity)} aria-label="edit" color="primary">
                                                                  <UndoIcon />
                                                                </IconButton>
                                                                 
                                                                </Fragment>
                                                            }
                                                            </Fragment>

                                                }
                                            </Fragment>
                                               
                                          }

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
                </DashBoardHead>
            </div>
        )
}

const mapStateToProps = state => ({
    assessment: state.assessment,
    auth: state.auth,
});

const mapDispatchToProp = { setAsApproved, setAsApprovedFalse, setAsDeclined, setAsDeclinedFalse, setAgainToPending, setAgainToPendingFalse };

export default connect(mapStateToProps, mapDispatchToProp)(ActivityAssessment);

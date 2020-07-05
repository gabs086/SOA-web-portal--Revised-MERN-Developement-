import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getActivitiesHead, setApprovedHead, setDeclinedHead } from '../../actions/requestActivitiesActions';

import { withStyles, makeStyles, useTheme, } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import DashBoardHead from '../layouts/DashboardHead';

import Typography from '@material-ui/core/Typography';

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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'

import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';

import Slide from '@material-ui/core/Slide';

//Confirmation Message
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
    root: {
        // ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2 ),
        paddingBottom: theme.spacing(2),
    },
     root2: {
    width: '100%',
    paddingBottom: '2 0px',
      flexGrow: 1,
  },
    link: {
    display: 'flex',
      },
       icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
      },
    reportButton: {
    paddingTop:15,
    },
       formControl: {
        // margin: theme.spacing.unit,
        minWidth: '100% ',
      },
 tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
}));

function RequestedActivities(props){
    const classes = useStyles();

    //States

      // Pagination Controls 
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);

      // Dummy State 
      const [reports,] = useState([]);
      const [loading, setLoading] = useState(true);

      const [id, setId] = useState();
      const [username, setUsername] = useState('');
      const [orgname, setOrgName] = useState('');
      // This state will have the value of the title of the request activity
      const [notification, setNotification] = useState('');

      // if the clicked event handler is Decline 
      const [reason, setReason] = useState('');

      // Data for the status of the request_activity 
      const [approved,] = useState('Approved1');
      const [declined,] = useState('Declined1');

      // Modal open for Approved 
      const [approvedModal, openApprovedModal] = useState(false);
      const [declinedModal, openDeclinedModal] = useState(false);

      const [openApproved, setOpenApproved] = useState(false);
      const [openDeclined, setOpenDeclined] = useState(false);

    //Event Handlers

     //Getting the pages, Material UI Funcs
          const handleChangePage = (event, newPage) => {
            setPage(newPage);
          };

          const handleChangeRowsPerPage = event => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          };

      const handleApprovedModalClose = _ =>  {
          openApprovedModal(false);
      }

      const handleDeclinedModalClose = _ => {
          openDeclinedModal(false);
      }

        const handleCloseApproved = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setOpenApproved(false);
          };

      const handleCloseDeclined = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setOpenDeclined(false);
      };



      const handleApproved = (id, username, orgname, notif) => {
          setId(id);
          setUsername(username);
          setOrgName(orgname);
          setNotification(notif);

          openApprovedModal(true);
      };

      const handleDeclined = (id, username, orgname, notif) => {
          setId(id);
          setUsername(username);
          setOrgName(orgname);
          setNotification(notif);

          openDeclinedModal(true);
      }

      const handleReason = e => {
        setReason(e.target.value);
      }

      const approvedFinal = _ => {
        const approvedBody = {
          status: approved
        };

        const notifBody = {
          username,
          orgname,
          notification,
        }
        props.setApprovedHead(id,approvedBody, notifBody);
        openApprovedModal(false);
        // console.log(id, approvedBody, notifBody);

      }

      const declinedFinal = _ => {
        const declinedBody = {
          status: declined
        }

        const notifBody = {
          username,
          orgname,
          notification,
          reason,
        }

        props.setDeclinedHead(id, declinedBody, notifBody);
        openDeclinedModal(false);
        // console.log(id, declinedBody, notifBody);
      }

    // Component Effect
    useEffect(_ => {

      const id = setInterval(_ => {
          props.getActivitiesHead();
          setLoading(false);
      },800);
      
      return _ => {
        clearInterval(id);
      }

    },[])

    // Effect is the request activity is now approved by the soa head
    useEffect(_ => {
        if (props.requestActivities.approvedByHead) {
             setOpenApproved(true)
        }
    },[props.requestActivities.approvedByHead]);

    // Effect if the request activity is declined
    useEffect(_ => {
        if (props.requestActivities.declinedByHead) {
            setOpenDeclined(true)
        }
    },[props.requestActivities.declinedByHead]);

    // Props
    const { auth } = props;

    const rows = props.requestActivities.request.sort((a, b) => a.created_at > b.created_at ? -1 : 1)
                    .filter(row => row.campus === auth.user.campus && row.status === 'Approved0');

    //Empty row that says the rows for pagination
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
            <div>
                <DashBoardHead>
                   {/* Component for Approved Confirmation message  */}
                <FormConfirmationMsg open={openApproved} onClose={handleCloseApproved} variant="success" message="Request Activity Approved" />
                  
                   {/* Component for Declined Confirmation Message  */}
                <FormConfirmationMsg open={openDeclined} onClose={handleCloseDeclined} variant="info" message="Request Activity Declined" />


                   {/* Modal for approve and declined action  */}

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
                           {"Approved Request Activity"}
                        </DialogTitle>

                        <DialogContent>

                          <DialogContentText id="alert-dialog-slide-description">
                              Are you sure to approve this requested activity?
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

                   {/* For Approved Modal */}

                    <Dialog
                       open={declinedModal}
                       TransitionComponent={Transition}
                       keepMounted
                       onClose={handleDeclinedModalClose}
                       aria-labelledby="alert-dialog-slide-title"
                       aria-describedby="alert-dialog-slide-description"
                       >
                           <DialogTitle id="alert-dialog-slide-title">
                               {"Decline Request Activity"}
                            </DialogTitle>

                            <DialogContent>

                              <DialogContentText id="alert-dialog-slide-description">
                                  Tell the reason why it is declined before sending bakc to org.
                                  </DialogContentText>

                                  <TextField
                                    onChange={handleReason}
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
                                  send
                                </Button>
                                <Button onClick={handleDeclinedModalClose} variant="outlined" color="secondary">
                                  cancel
                                </Button>
                              </DialogActions>
                       </Dialog>

                    <Typography variant="h6">
                        Request Activity List
                    </Typography>

                     <Paper className={classes.root}>                        
                        <div className={classes.tableWrapper}>

                         <Table className={classes.table} aria-label="custom pagination table">
                            {/* Table Head of the datas  */}
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Organization Name</StyledTableCell>
                                <StyledTableCell align="left">Organization Campus</StyledTableCell>
                                <StyledTableCell align="left">Activity Title</StyledTableCell>
                                <StyledTableCell align="left">Description</StyledTableCell>
                                <StyledTableCell align="left">File</StyledTableCell>
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
                                        rows.length === 0
                                        ?
                                    <TableCell rowSpan={5} colSpan={8} style={{textAlign: 'center',}}>
                                       <br></br>
                                       No Request activity for today.
                                     </TableCell>
                                        :
                                        //Data to be displayed when the data is fetched
                                      (rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                      )
                                      .map(row => (
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            {row.orgname}
                                          </TableCell>
                                          <TableCell align="left">{row.campus}</TableCell>
                                          <TableCell align="left">{row.activity_title}</TableCell>
                                          <TableCell align="left">{row.description}</TableCell>
                                          <TableCell align="left">
                                            <a href={row.file} target="_blank">
                                              <GetAppIcon />
                                            </a>
                                            {row.fileName}
                                          </TableCell>
                                          <TableCell align="left">
                                              <Button variant="contained" 
                                              color="primary" 
                                              onClick={_ => handleApproved(row.id, row.username, row.orgname, row.activity_title)}>
                                                Accept
                                              </Button>
                                              <br />
                                              |
                                              <Button 
                                              onClick={_ => handleDeclined(row.id, row.username, row.orgname, row.activity_title)}
                                              variant="contained" 
                                              color="secondary">
                                                Decline
                                              </Button>
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
};

const mapStateToProps = state => ({
    auth: state.auth,
    requestActivities: state.requestActivities
});

const mapDispatchToProps = { getActivitiesHead, setApprovedHead, setDeclinedHead };

export default connect(mapStateToProps, mapDispatchToProps)(RequestedActivities);
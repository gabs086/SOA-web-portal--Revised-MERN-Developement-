import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { addAnnouncementFalse, updateAnnouncementFalse, deleteAnnouncement, deleteAnnouncementFalse } from '../../actions/announcementActions';

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

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Slide from '@material-ui/core/Slide';

//Admin Dashboard Component
import DashboardAdmin from '../layouts/DashboardAdmin';
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



const styles = makeStyles(theme => ({
    root: {
        // ...theme.mixins.gutters(),
        // paddingTop: theme.spacing(2),
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

function AnnounceEvents(props){
        const classes = styles();

    /* States */
      
      // Pagination Controls 
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);

      const [id, setId] = useState();

      const [events, getEvents] = useState([]);
      const [loading, setLoading] = useState(true);
      const [ifError, setIfError] = useState(false);

      //Confirmation States
      const [added, setAdded] = useState(false);  
      const [updated, setUpdate] = useState(false);
      const [deleted, setDeleted] = useState(false);

      //Delete modal State
      const [deleteModal, openDeleteModal] = useState(false);

    /* Event Handlers */
        //Getting the pages, Material UI Funcs
          const handleChangePage = (event, newPage) => {
            setPage(newPage);
          };

          const handleChangeRowsPerPage = event => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          };

            // Event for openAdded state 
        const handleClose = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setAdded(false);
                props.addAnnouncementFalse();
          };

                // Event for openAdded state 
        const handleCloseUpdate = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setUpdate(false);
                props.updateAnnouncementFalse();
          };

          const handleCloseDelete = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setDeleted(false);
                props.deleteAnnouncementFalse();
          };

          //Delete button function
        const handleDelete = id => {
          setId(id);

          openDeleteModal(true);
        }

        //Final action for the delete action
        const deleteFinal = _ => {
          props.deleteAnnouncement(id);

          openDeleteModal(false);

        }

        const handleDeleteModalClose = _ => {
          openDeleteModal(false)
        }

        useEffect(_ => {

        axios.get('/api/announcements/')
        .then(res => {
          getEvents(res.data);
          setLoading(false);
        })
        .catch(err => {
          if(err) 
            setIfError(true)
        })

        },[props.announcement.added, props.announcement.updated, props.announcement.deleted]);

    /* Component Effect */
    useEffect(_ => {
      if(props.announcement.added)
          setAdded(true);

      setTimeout(function(){ props.addAnnouncementFalse() }, 6000);


    },[props.announcement.added]);

    useEffect(_ => {
       if(props.announcement.updated)
          setUpdate(true)

      setTimeout(function(){ props.updateAnnouncementFalse() }, 6000);

    },[props.announcement.updated])

    useEffect(_ => {
       if(props.announcement.deleted)
          setDeleted(true)

      setTimeout(function(){ props.deleteAnnouncementFalse() }, 6000);

    },[props.announcement.deleted])

    const rows = events.sort((a, b) => a.created_at > b.created_at ? -1 : 1);

    // console.log(rows);
    //Empty row that says the rows for pagination
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
            <div>
                <DashboardAdmin>

                 {/* Modal body for the delete */}

                   <Dialog
                   open={deleteModal}
                   TransitionComponent={Transition}
                   keepMounted
                   onClose={handleDeleteModalClose}
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
                            <Button onClick={deleteFinal} variant="outlined" color="primary">
                              Yes
                            </Button>
                            <Button onClick={handleDeleteModalClose} variant="outlined" color="secondary">
                              No
                            </Button>
                          </DialogActions>
                   </Dialog>

                <FormConfirmationMsg open={added} onClose={handleClose} variant="success" message="Announcement Added."  />
                <FormConfirmationMsg open={updated} onClose={handleCloseUpdate} variant="success" message="Announcement Update Successfully."  />
                <FormConfirmationMsg open={deleted} onClose={handleCloseDelete} variant="success" message="Announcement Delete Successfully."  />

      {/* Button that will redirect to registering a account*/}
                 <Button 
                        href="/ad/announceevent/addevent"
                        className={classes.button}
                        variant="outlined" 
                        color="secondary"
                        >
                        Add Event
                    </Button>
                    <br />
                    <br />  

                    <Paper className={classes.root}>
                        
                        <div className={classes.tableWrapper}>

                            <Table className={classes.table} aria-label="custom pagination table">
                            {/* Table Head of the datas  */}
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Event title</StyledTableCell>
                                <StyledTableCell align="left">Date of Event</StyledTableCell>
                                <StyledTableCell align="left">Time of Event</StyledTableCell>
                                <StyledTableCell align="left">Venue of the Event</StyledTableCell>
                                <StyledTableCell align="left">Description</StyledTableCell>
                                <StyledTableCell align="left">Announce by</StyledTableCell>
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
                                            {row.title}
                                          </TableCell>
                                          <TableCell align="left">{moment(row.dateDate).format('MMMM D YYYY')}</TableCell>
                                          <TableCell align="left">{moment(row.date).format('LT')}</TableCell>
                                          <TableCell align="left">{row.venue}</TableCell>
                                          <TableCell align="left">{row.description}</TableCell>
                                          <TableCell align="left">{row.setBy}</TableCell>
                                          <TableCell align="left">

                                                <Tooltip title="Update" placement="top">
                                                 <IconButton href={`/ad/announceevent/updateevent/${row.id}`} aria-label="edit" color="primary">
                                                  <EditIcon />
                                                </IconButton>
                                              </Tooltip>   

                                              <Tooltip title="Delete" placement="top">
                                                 <IconButton onClick={_ => handleDelete(row.id)} aria-label="edit" color="secondary">
                                                  <DeleteIcon />
                                                </IconButton>
                                              </Tooltip>   

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

                </DashboardAdmin>
            </div>
        )
    
}

const mapStateToProps = state => ({
  announcement: state.announcement,
});

const mapDispatchToProps = { addAnnouncementFalse, updateAnnouncementFalse, deleteAnnouncement, deleteAnnouncementFalse }; 

export default connect(mapStateToProps, mapDispatchToProps)(AnnounceEvents);

import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

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

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import AssessmentIcon from '@material-ui/icons/Assessment';
import EventNoteIcon from '@material-ui/icons/EventNote';

import Grid from '@material-ui/core/Grid';

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

function CheckRegisteredStudents(props){
    const classes = useStyles();

    // Pagination Controls addAnnouncementFalseHead
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    //Filter State
    const [filter, setFilter] = useState('');

    //Data States
    const [students, getStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ifError, setIfError] = useState(false);
    
            //Event Handlers
    const handleChangePage = (event, newPage) => {
           setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
         setRowsPerPage(parseInt(event.target.value, 10));
         setPage(0);
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
     },[]);


    const rows = students.sort((a, b) => a.created_at > b.created_at ? -1 : 1);

    //Empty row that says the rows for paginationaddAnnouncementFalseHead
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    // console.log(props);

     return (
              <DashBoardHead>

              <Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
                <Link color="inherit" href="/h/activityassessment" className={classes.link}>
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
                  Join 
                </Link>
            </Breadcrumbs>

                 <Paper className={classes.root}>

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
                                <StyledTableCell align="left">Actions</StyledTableCell>


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
                                            <Tooltip title="Complete requirements" placement="top">
                                                 <IconButton aria-label="edit" style={{color: 'green'}}>
                                                  <CheckCircleIcon />
                                                </IconButton>
                                              </Tooltip> 
                                              |
                                              <Tooltip title="Delete Request" placement="top">
                                                 <IconButton aria-label="Delete" color="secondary">
                                                  <CancelIcon />
                                                </IconButton>
                                              </Tooltip> 
                                              </Fragment>
                                              :
                                              <span>
                                              Student is complete in requirements
                                              </span>
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

              </DashBoardHead>
      )

}

export default CheckRegisteredStudents;
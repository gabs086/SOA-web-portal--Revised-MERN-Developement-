import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { setReportToFound, setReportToClaimed } from '../../actions/lafActions';

import axios from 'axios';
import moment from 'moment';

import { withStyles, makeStyles, useTheme,} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

//Other Components
import FoundSuccessMsg from './FoundSuccessMsg';
import ClaimedSuccessMsg from './ClaimedSuccessMsg';

// Dashboard Component  
import DashBoardHead from '../layouts/DashboardHead';

// Table 2 component 
import LostAndFoundTable2 from './LostAndFoundTable2';

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

//Colored button for The Claimed Action
const ClaimedButton = withStyles((theme) => ({
  root: {
    // color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

// Table Functions for table pagination 
// Table one 
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
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

// Style of the main Component 
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
});

// Main component 
function LostAndFound(props) {
    const classes = props;
    // Table pagination Actions states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [reports, getReports] = useState([]);
   // Loading for fetching datas 
  const [loading, setLoading] = useState(true);

  // State for the confirmation message component
  const [found, setFound] = useState(false);
  const [claimed, setClaimed] = useState(false);

  //statements for the action to be submitted as data for found and claimed actions
  const [foundData, ] = useState('Found, Not Claimed');
  const [claimedData, ] = useState('Found and Claimed');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Action for Claimed and Found
    // The function button for setting the data into found 
  const setAsFound = id => {
      
      if(window.confirm("Are you sure this report item is now found?") ){
         const updateStatusFound = {
            status: foundData
          };

          props.setReportToFound(id, updateStatusFound);
          setFound(true);
      }
 
    };

    // The function button for setting the data into found 
  const setAsClaimed = id => {
    if(window.confirm("Are you sure this report item is now claimed?")){
        const updateStatusClaimed = {
          status: claimedData
        };

        props.setReportToClaimed(id, updateStatusClaimed);
        setClaimed(true);
      }
        };

    //Success handlin message 
  const handlingCloseAction = (event, reason) => {
    if(reason === 'clickaway'){
        return
    }
    setFound(false);
  };

    //Success handlin message 
  const handlingCloseAction1 = (event, reason) => {
    if(reason === 'clickaway'){
        return
    }
    setClaimed(false);
  };
  
// Fuction expression for getting all the reports in the database 
  const fetchReports = async _ => {
    const res = await axios.get('/api/laf/getreportlostitem');
      getReports(res.data);
      setLoading(false);
  };
   
  useEffect( _ => {
   // an Interval that fetches the reports and renders every 2secs. 
// It will update the component whether if theres changes or not 
    const id = setInterval(_ => {
      fetchReports();
    }, 2000);

    return _ => {
      clearInterval(id);
    }

  },[]);

  //Date Methods Filtering
  let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  //This variable is used to f
  const dateFilter = moment(today).format('YYYY-MM-DD');

  // This is the props for getting the details of the user 
  const auth = props.auth;

  //Array of the reports in the lost item reports 
  //The array is now sorted that it only accepts data that is reported today and if the the campus of the user is equal to the campus or the report.
  const rows = reports.sort((a, b) => (a.created_at > b.created_at ? -1 : 1)).filter(row => 
    ( moment(row.created_at).format('YYYY-MM-DD') === dateFilter && auth.user.campus === row.campus)
  );

   //Empty row that says the rows for pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
    <DashBoardHead>

    {/* Confirmation messages */}
    <FoundSuccessMsg open={found} onClose={handlingCloseAction}/>
    <ClaimedSuccessMsg open={claimed} onClose={handlingCloseAction1}/>

          <Typography variant="h4" gutterBottom>
            Reports today
          </Typography>
          
      <Paper className={classes.root}>

                {/* Table for the today reports will be here */}
           <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-label="custom pagination table">

                <TableHead>
                  <TableRow>
                    <StyledTableCell>Student name</StyledTableCell>
                    <StyledTableCell align="left">SR-Code</StyledTableCell>
                    <StyledTableCell align="left">College Year</StyledTableCell>
                    <StyledTableCell align="left">Campus</StyledTableCell>
                    <StyledTableCell align="left">Department</StyledTableCell>
                    <StyledTableCell align="left">Student course</StyledTableCell>
                    <StyledTableCell align="left">Lost Item Details</StyledTableCell>
                    <StyledTableCell align="left">Contact Details</StyledTableCell>
                    <StyledTableCell align="left">Report Status</StyledTableCell>
                    <StyledTableCell align="left">Date Reported</StyledTableCell>
                    <StyledTableCell align="left">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>

               {/* Body for displaying the reports */}
            <TableBody>
              { loading 
                ? 
                //  If the loading state is still true, this preloader will be displayed
                  <TableRow>
                  <TableCell rowSpan={5} colSpan={8} style={{textAlign: 'center',}}>
                    <CircularProgress color="secondary" /><br/>
                    <span>Loading ...</span>
                  </TableCell>
                </TableRow>
                :    
                // Else if the rows variable with the array of reports have the no data
                // This component will be displayed
                <Fragment>
                  {
                  rows.length === 0
                    ?
                    <TableRow>
                    <TableCell rowSpan={5} colSpan={8} style={{textAlign: 'center',}}>
                        <span>No Report for today ? Refresh the page after 5 mins to see what's up</span>
                    </TableCell>
                  </TableRow>
                    :
                //Then if the rows variable has a data, the date will be presented in the table
                <Fragment>
                {
                  (rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                  )
                  .map((row, id) => (
                    // The row where all the datas will be displayed 
                  <TableRow>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.src}</TableCell>
                  <TableCell align="left">{row.yr}</TableCell>
                  <TableCell align="left">{row.campus}</TableCell>
                  <TableCell align="left">{row.department}</TableCell>
                  <TableCell align="left">{row.course}</TableCell>
                  <TableCell align="left">{row.details}</TableCell>
                  <TableCell align="left">{row.contact}</TableCell>
                  {
                    row.status === 'Unfound/Unclaimed'
                    ? <TableCell align="left" style={{ color: 'red' }}>{row.status}</TableCell>
                    : 
                      <Fragment>
                        {
                          row.status === 'Found, Not Claimed'
                          ?
                          <TableCell align="left" style={{ color: 'blue'}}>{row.status}</TableCell>
                          :
                           <TableCell align="left" style={{ color: 'green'}}>{row.status}</TableCell>
                        }
                      </Fragment>
                   
                  }
                  <TableCell align="left">{moment(row.created_at).format('YYYY-MM-DD')}</TableCell>
                  <TableCell align="left">
                   
                      { /*These buttons will be the actions for declaring the report claimed or found */}
                      {
                        row.status === 'Unfound/Unclaimed'
                        ?
                        <Fragment>
                         <Button onClick={ _ => setAsFound(row.id)} variant="contained" color="primary">Set as found</Button>
                            |
                          <ClaimedButton onClick={ _ => setAsClaimed(row.id)} variant="contained" color="primary">
                          Set as claimed
                          </ClaimedButton>
                        </Fragment>
                        :
                        <Fragment>
                        {
                          row.status === 'Found, Not Claimed'
                            ?
                           <ClaimedButton onClick={ _ => setAsClaimed(row.id)} variant="contained" color="primary">
                            Set as claimed
                            </ClaimedButton>
                          :
                           <Fragment>
                               Report Closed
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
                </Fragment>
  
              }

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

                {/* Pagination Actions  */}
                <TableFooter>
                  <TableRow>
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
                <br/>

                <Typography variant="h4" gutterBottom>
                  All Reports
                </Typography>

                <LostAndFoundTable2 />

            </DashBoardHead>
    )
};

 LostAndFound.propTypes = {
      history: PropTypes.object.isRequired,
    };
const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = { setReportToFound, setReportToClaimed };


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LostAndFound)));

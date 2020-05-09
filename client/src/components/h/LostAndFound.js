import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getLostReport, setReportToFound, setReportToClaimed } from '../../actions/lafActions';

import moment from 'moment';

import { withStyles, makeStyles, useTheme,} from '@material-ui/core/styles';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
   // Loading for fetching datas 
  const [loading, setLoading] = useState(true);

 //Dialog Confirmation Action state for statuses of each report
  // State for Found button 
  const [open, setOpen] = useState(false);
  //State for Claimed button
  const [open1, setOpen1] = useState(false);

  const [found, setFound] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // setters for the setting the found and claimed action to true 
  const setFoundToTrue = _ => {
    setFound(true);
    setOpen(false);
  }
  const setClaimedToTrue = _ => {
    setClaimed(true);
    setOpen1(false);
  }
  
  //Action for Claimed and Found
    // The function button for setting the data into found 
  const setAsFound = id => {
       console.log(id);
      setOpen(true);
    };

    // The function button for setting the data into found 
  const setAsClaimed = id => {
      console.log(id);
      setOpen1(true);
    };

  const handleClose = () => {
      setOpen(false);
    };

  const handleClose1 = () => {
      setOpen1(false);
    };

  // Fetch the datas of lost item reports through reducer 
  useEffect( _ => {
    props.getLostReport();
    setLoading(false);

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
  const rows = props.laf.reports.sort((a, b) => (a.created_at > b.created_at ? -1 : 1)).filter(row => 
    ( moment(row.created_at).format('YYYY-MM-DD') === dateFilter && auth.user.campus === row.campus)
  );

   //Empty row that says the rows for pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
  console.log(props);
  console.log(found, claimed);

    return (
    <DashBoardHead>

    {/*Dialogue message for confirmation if the report will be set as "Found, Not Claimed" or 
          "Found and Claimed" status*/}
        {/* Dialog Message box for the Found action button*/}
           <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{'Set to "Found, Not Claimed" Status?'}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure that this lost report is found?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={setFoundToTrue} color="primary" variant="outlined" autoFocus>
                  Yes
                </Button>
                   <Button onClick={handleClose} color="secondary" variant="outlined">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

          {/* Dialog Message box for the Claimed action button*/}
           <Dialog
              open={open1}
              onClose={handleClose1}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{'Set to Found and Claimed" Report'}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure that this lost report is claimed?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
               <Button onClick={setClaimedToTrue} color="primary" variant="outlined" autoFocus>
                  Yes
                </Button>
                <Button onClick={handleClose1} color="secondary" variant="outlined">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>


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
                      <span>No Report for today</span>
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
                    : <TableCell align="left">{row.status}</TableCell>
                  }
                  <TableCell align="left">{moment(row.created_at).format('YYYY-MM-DD')}</TableCell>
                  <TableCell align="left">
                   
                      { /*These buttons will be the actions for declaring the report claimed or found */}
                      <Button onClick={setAsClaimed} variant="contained" color="primary">Set as claimed</Button>
                      |
                       <Button onClick={setAsFound} variant="contained" color="primary">Set as found</Button>

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
}
const mapStateToProps = state => ({
  laf: state.laf,
  auth: state.auth
});

//Dipatch proptypes(React Hooks) 
const mapDispatchToProps = { getLostReport };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LostAndFound));

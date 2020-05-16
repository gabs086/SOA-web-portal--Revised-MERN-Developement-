import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';

import { withStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
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
import Typography from '@material-ui/core/Typography';

// Dashboard Component  
import DashBoardHead from '../layouts/DashboardHead';

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


const styles = theme => ({	
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    link: {
    display: 'flex',
  },
   icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
   table: {
        minWidth: 500,
      },
  tableWrapper: {
        overflowX: 'auto',
      },
});

const Found = (props) => {
	const classes = props;

	// Table pagination Actions states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Data State for getting the reports 
    const [reports, getReports] = useState([]);

      // Loading for fetching datas 
    const [loading, setLoading] = useState(true);

     const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

  // This is the props for getting the details of the user 
  const auth = props.auth;

  //Date Methods Filtering
  let today = new Date();
   const dd = String(today.getDate()).padStart(2, '0');
   const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
   const yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  const dateFilter = moment(today).format('YYYY-MM-DD');

  //Array of the reports in the lost item reports 
  const rows = reports.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
  .filter(row => ( moment(row.created_at).format('YYYY-MM-DD') !== dateFilter && auth.user.campus === row.campus ) );

    //Empty row that says the rows for pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
     <DashBoardHead>

      <Breadcrumbs aria-label="breadcrumb"  style={{ paddingBottom: '20px'}}>
        <Link color="inherit" href="/h/lostandfound" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Menu
        </Link>

        <Link
          color="textPrimary"
          href="/h/lostandfound/foundreports"
          aria-current="page"
          className={classes.link}
        >
        <FindReplaceIcon className={classes.icon}/>
          Lost Reports
        </Link>
    </Breadcrumbs>

    <Typography variant="h4" gutterBottom>
            Found Item Records
          </Typography>

         <Paper className={classes.root}>
               {/*Table of reports will be Here */}
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
                    <TableRow>
                      <TableCell rowSpan={5} colSpan={8} style={{textAlign: 'center',}}>
                        <span>No Report Records? Refresh the page after 5 mins to see what's up</span>
                      </TableCell>
                    </TableRow>
                    :
                      //Data to be displayed when the data is fetched
                      <Fragment>
                      {
                      
                        (rowsPerPage > 0
                          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : rows
                        )
                        .map(row => (
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
                            <TableCell align="left">{row.status}</TableCell>
                            <TableCell align="left">{moment(row.created_at).format('YYYY-MM-DD')}</TableCell>
                            <TableCell align="left">
                            		Actions buttons will be here
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
     </DashBoardHead>
  )
}

export default withStyles(styles)(Found);
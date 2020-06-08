import React, { Fragment, useState } from 'react';

// Material-ui components 
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';

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
import Button from '@material-ui/core/Button';

//Header of the Table
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

 // Main Component Style 
 const useStyles = makeStyles(theme => ({
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
    link: {
    display: 'flex',
  },
   icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
 }))

function RequestActivitiesHistory(props) {
	const classes= useStyles();

// States 

	// Table pagination Actions states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [reports, ] = useState([]);

  //Loading State
  const [loading, setLoading] = useState(true);

  // Event Handlers 

   const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Component Effect

   //Array of the reports in the lost item reports 
  //The array is now sorted that it only accepts data that is reported today and if the the campus of the user is equal to the campus or the report.
  const rows = reports.sort((a, b) => (a.created_at > b.created_at ? -1 : 1));


  //Empty row that says the rows for pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


  return (
    <Fragment>
    		
    		{/* Table for the today reports will be here */}
           <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-label="custom pagination table">

                <TableHead>
                  <TableRow>
                    <StyledTableCell>Req_Act Title</StyledTableCell>
                    <StyledTableCell align="left">Submitted File</StyledTableCell>
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

    </Fragment>
  )
}

export default RequestActivitiesHistory;
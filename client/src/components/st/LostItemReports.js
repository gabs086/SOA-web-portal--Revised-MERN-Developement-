import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getLostReport } from '../../actions/lafActions';

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
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
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
//Components
import Navbar from '../layouts/Navbar';
import SuccessMsg from './SuccessMsg';

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

// Style for the LostItemReports Component 
const useStyles2 = makeStyles( theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  spinner: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    marginTop: '50px',
    height: '50px'
  }
}));

// Main Component   console.log(props.laf.reports);
function LostItemReports(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  
  //Success handlin message 
  const handleClose = (event, reason) => {
    if(reason === 'clickaway'){
        return
    }
    setOpen(false);
  }

  // Gets an effect in the component if the lost state in the laf prop is true 
  useEffect(() => {
    // Action for fetching the datas in lafActions
    props.getLostReport();
    setLoading(false);

  if(props.laf.lost){
      setOpen(true)
  }
  }, [props.laf.lost]);


  //Getting the pages, Material UI Funcs
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //Array of the reports in the lost item reports 
  const rows = props.laf.reports.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      {/* Message confirmation */}
      <SuccessMsg open={open} onClose={handleClose}/>

    {/* Main Component  */}
    <Navbar />

    <Container style={{paddingTop: 20}}>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-label="custom pagination table">
        {/* Table Head of the datas  */}
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
          </TableRow>
        </TableHead>

      {/* Body for displaying the reports */}
            <TableBody>
              { loading || rows.length === 0
                ? 
                //When the data is still loading
                <TableRow>
                  <TableCell rowSpan={5} colSpan={8} style={{textAlign: 'center',}}>
                    <CircularProgress color="secondary" /><br/>
                    <span>Loading ...</span>
                  </TableCell>
                </TableRow>
                :   
                //Data to be displayed when the data is fetched
                <Fragment>
                {
                  (rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                  ).map(row => (
                    <TableRow key={row.name}>
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
  );
}


const mapStateToProps = state => ({
  laf:state.laf,
});

//Dipatch proptypes(React Hooks) 
const mapDispatchToProps = { getLostReport };

export default connect(mapStateToProps, mapDispatchToProps)(LostItemReports)
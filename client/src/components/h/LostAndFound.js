import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getLostReport } from '../../actions/lafActions';

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

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

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

 // For creating a dummy data 
 function createData(name, calories, fat) {
  return { name, calories, fat };
}
// the dummy data created
const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

function LostAndFound(props) {
    const classes = props;
    // Table pagination Actions states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
   // Loading for fetching datas 
  const [loading, setLoading] = useState(true);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Fetch the datas of lost item reports through reducer 
  useEffect( _ => {
    props.getLostReport();
    setLoading(false);

  },[]);

  //Date Methods Filtering
  const date = new Date();
  const year = date.getFullYear()
  const day = date.getDate();
  const month = date.getMonth();
  const dayString = `${day}`;
  // Month Array because it has a index that starts in 0
  const monthArr = [
    1,2,3,4,5,6,7,8,9,10,11,10
  ];
  // and use it to get the current month today 
  const monthString = `${monthArr[month]}`;
  // Padstart Prototype in JavaScript method pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length. The padding is applied from the start of the current string.
  // This will be the reference for the getting the Date of the reports 
  const dateToday = `${year}-${monthString.padStart(2, '0')}-${dayString.padStart(2, '0')}`;
  const dateDate = new Date(`${dateToday}`);

    return (
    <DashBoardHead>
          <Typography variant="h4" gutterBottom>
            Reports today
          </Typography>
          
      <Paper className={classes.root}>

                {/* Table for the today reports will be here */}
           <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-label="custom pagination table">

                <TableHead>
                  <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="left">Calories</StyledTableCell>
                      <StyledTableCell align="left">Fat</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                 {(rowsPerPage > 0
                   ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                   : rows
                  ).map(row => (
                   <TableRow key={row.name}>
                     <TableCell component="th" scope="row">
                       {row.name}
                     </TableCell>
                     <TableCell align="right">{row.calories}</TableCell>
                     <TableCell align="right">{row.fat}</TableCell>
                   </TableRow>
                 ))}

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
  laf: state.laf
});

//Dipatch proptypes(React Hooks) 
const mapDispatchToProps = { getLostReport };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LostAndFound));

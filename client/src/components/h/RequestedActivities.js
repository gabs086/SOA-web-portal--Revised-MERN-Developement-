import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
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

    //Event Handlers

     //Getting the pages, Material UI Funcs
          const handleChangePage = (event, newPage) => {
            setPage(newPage);
          };

          const handleChangeRowsPerPage = event => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          };

    // Component Effect

    const rows = reports.sort((a, b) => a.created_at > b.created_at ? -1 : 1);

    //Empty row that says the rows for pagination
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
            <div>
                <DashBoardHead>

                    <Typography variant="h6">
                        Request Activity List
                    </Typography>

                     <Paper className={classes.root}>                        
                        <div className={classes.tableWrapper}>

                         <Table className={classes.table} aria-label="custom pagination table">
                            {/* Table Head of the datas  */}
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Name of student</StyledTableCell>
                                <StyledTableCell align="left">College Year</StyledTableCell>
                                <StyledTableCell align="left">SR-Code</StyledTableCell>
                                <StyledTableCell align="left">Campus</StyledTableCell>
                                <StyledTableCell align="left">Department</StyledTableCell>
                                <StyledTableCell align="left">ID_R Reason</StyledTableCell>
                                <StyledTableCell align="left">ID_R Count</StyledTableCell>
                                <StyledTableCell align="left">Remarks</StyledTableCell>
                                <StyledTableCell align="left">Date Recorded</StyledTableCell>
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
                                    //Data to be displayed when the data is fetched
                                      (rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                      )
                                      .map(row => (
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            {row.name}
                                          </TableCell>
                                          <TableCell align="left">{row.year}</TableCell>
                                          <TableCell align="left">{row.src}</TableCell>
                                          <TableCell align="left">{row.campus}</TableCell>
                                          <TableCell align="left">{row.department}</TableCell>
                                          <TableCell align="left">{row.idreason}</TableCell>
                                          <TableCell align="left">{row.count > 1 ? `${row.count} marks` : `${row.count} mark` }</TableCell>
                                          <TableCell align="left">{row.otherinfo}</TableCell>
                                          <TableCell align="left"></TableCell>
                                          <TableCell align="left">
                                                {/*
                                              <Tooltip title="Update" placement="top">
                                                 <IconButton href={`/ad/idreplacement/updateidreplacement/${row.id}`} aria-label="edit" color="primary">
                                                  <EditIcon />
                                                </IconButton>
                                              </Tooltip>   
                                          */}

                                          </TableCell>
                                        </TableRow>
                                      ))
                                    
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

export default RequestedActivities;

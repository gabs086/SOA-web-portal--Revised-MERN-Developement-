import React, {useState, useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import { getOrgDesc } from '../../actions/orgDescActions';
import axios from 'axios';

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

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
    // root: {
    //     // ...theme.mixins.gutters(),
    //     paddingTop: theme.spacing(2),
    //     paddingBottom: theme.spacing(2),
    // },
     root2: {
    width: '100%',
    paddingBottom: '2 0px',
      flexGrow: 1,
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

function OrgList(props){
    const classes = useStyles();

    //States
          // Pagination Controls State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);  

      //Campus fetching states
  const [campuses, getCampuses] = useState([]);
  const [loadingCampuses, setLoadingCampuses] = useState(true);  

  // Search State 
    const [searchDept, setSearchDept] = useState('');

    // Event Handlers 
      //Getting the pages, Material UI Funcs
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    //Component Effect
    useEffect(_ => {
        props.getOrgDesc();
    },[]);

    const { user } = props.auth;

      //Amd filters it by chosen campus
  const rows = props.orgDesc.records.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
    .filter(row => row.campus === user.campus)

  //Empty row that says the rows for pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    console.log(props);
        return (
            <div>
                <DashBoardHead>
          {/* Form Filters */} 

          <Typography variant="h4">Organization list of the campus</Typography>
          <br />
                    <Paper className={classes.root2}>

                    <Grid container spacing={3}>
                      
                        <Grid item sm={12}>
                            <TextField
                                id="searchDept"
                                name="searchDept"
                                label="Search by department"
                                fullWidth
                                className="classes.formControl"
                                value={searchDept}
                                autoComplete="searchDept"
                                onChange={e => setSearchDept(e.target.value)}
                             />
                        </Grid>
                    </Grid>
                        
                    </Paper>

                    <br /> 

                     <Paper>
                            <div className={classes.tableWrapper}>

                            <Table className={classes.table} aria-label="custom pagination table">
                            {/* Table Head of the datas  */}
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Campus</StyledTableCell>
                                <StyledTableCell align="left">Department</StyledTableCell>
                                <StyledTableCell align="left">Organization Name</StyledTableCell>
                                <StyledTableCell align="left">Org President Name</StyledTableCell>
                                <StyledTableCell align="left">Org Adviser Name</StyledTableCell>
                                <StyledTableCell align="left">Members Count</StyledTableCell>
                                <StyledTableCell align="left">Officers Count</StyledTableCell>
                                <StyledTableCell align="left">Organization Description</StyledTableCell>
                              </TableRow>
                            </TableHead>

                          {/* Body for displaying the reports */}
                                <TableBody>
                                  { props.orgDesc.loading 
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
                                       rows.length === 0 ?
                                       <TableCell rowSpan={5} colSpan={8} style={{textAlign: 'center',}}>
                                       <ArrowUpwardIcon /><br></br>
                                       Pls search at the top to filter by campus...
                                     </TableCell>
                                      :
                                      (rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                      )
                                      //Filter the row by what will be typed in the search filter for department then map the result
                                      .filter(row => row.department.toLowerCase().search(searchDept.toLowerCase()) !== -1)
                                      .map(row => (
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            {row.campus}
                                          </TableCell>
                                          <TableCell align="left">{row.department}</TableCell>
                                          <TableCell align="left">{row.orgname}</TableCell>
                                          <TableCell align="left">{row.orgpresname}</TableCell>
                                          <TableCell align="left">{row.orgadvisername}</TableCell>
                                          <TableCell align="left">{row.quantitymembers}</TableCell>
                                          <TableCell align="left">{row.quantityofficers}</TableCell>
                                          <TableCell align="left">{row.description}</TableCell>
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
}

const mapStateToProps = state => ({
     orgDesc: state.orgDesc,
     auth: state.auth
});

const mapDisPatchToProps = { getOrgDesc };

export default connect(mapStateToProps, mapDisPatchToProps)(OrgList);

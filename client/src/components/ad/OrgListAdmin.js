import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import axios from 'axios';

import { getOrgDesc, deleteOrgDesc } from '../../actions/orgDescActions';

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

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

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

//Admin Dashboard Component
import DashboardAdmin from '../layouts/DashboardAdmin';
import OrgAddFormSuccessMsg from './OrgAddFormSuccessMsg';
import OrgUpdateFormSuccessMsg from './OrgUpdateFormSuccessMsg';
import OrgListAdminDeleteMsg from './OrgListAdminDeleteMsg';

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
});

function OrgListAdmin(props){
    const classes = props;

    //////////States/////////////
      // Pagination Controls 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

    //Campus fetching states
  const [campuses, getCampuses] = useState([]);
  const [loadingCampuses, setLoadingCampuses] = useState(true);

    // Search State 
const [searchCampus, setSearchCampus] = useState('');
const [searchDept, setSearchDept] = useState('');

// Data Table Loading
const [loading, setLoading] = useState(true);

//Success Message state
const [open, setOpen] = useState(false);
const [openDelete, setOpenDelete] = useState(false);
const [openUpdate, setOpenUpdate] = useState(false);

  /////////////Evente Handlers/////////////////

  //Getting the pages, Material UI Funcs
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

const handleChangeCampuses = e => {
    setSearchCampus(e.target.value);
};

const handleChangeDept = e => {
    setSearchDept(e.target.value);
};

 const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleCloseDelete = (event, reason) => {
    if(reason === 'clickaway'){
      return;
    }
    setOpenDelete(false)
  };

  const handleCloseUpdate = (event, reason) => {
    if(reason === 'clickaway'){
      return;
    }
    setOpenUpdate(false);
  };

  // Event for deleting a organization by specific id 
const deleteOrganization = id => {
  if(window.confirm("Are you sre to delete this organization?")){
      props.deleteOrgDesc(id);
      setOpenDelete(true)
  }
};

// Component Effects 

// useEffect for getting the campuses
useEffect( _ => {

    const id = setInterval( _ => {
        (async _ => {
            const res = await axios.get('/api/campuses');
            getCampuses(res.data);
            setLoadingCampuses(false)
        })();
    }, 2000)

    return _ => {
        clearInterval(id);
    }

},[]);

// UseEffect for getting the organization records 
useEffect( _ => {

    const id = setInterval( _ => {

        props.getOrgDesc();
        setLoading(false)

    }, 2000)

    return _ => {
        clearInterval(id);
    }

},[]);

useEffect( _ => {
    if(props.orgDesc.added)
        setOpen(true)
},[props.orgDesc.added]);

useEffect( _ => {
  if(props.orgDesc.updated)
      setOpenUpdate(true)
},[props.orgDesc.updated]);

  //Array of the reports in the lost item reports 
  //Amd filters it by chosen campus
  const rows = props.orgDesc.records.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
    .filter(row => row.campus === searchCampus)

  //Empty row that says the rows for pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
            <div>
                <DashboardAdmin>

                <OrgAddFormSuccessMsg open={open} onClose={handleClose} />
                <OrgUpdateFormSuccessMsg open={openUpdate} onClose={handleCloseUpdate} />
                <OrgListAdminDeleteMsg open={openDelete} onClose={handleCloseDelete} />

                    <Button 
                        href="/ad/organizationlist/addrecord"
                        className={classes.reportButton} 
                        variant="outlined" 
                        color="secondary"
                        >
                        Add Record
                    </Button>
                    &nbsp;
                    <Button 
                        href="/ad/organizationlist/accountlist"
                        className={classes.reportButton} 
                        variant="outlined" 
                        color="primary"
                        >
                        Account List
                    </Button>

                    <br/>
                    <br/>

                    {/* Form Filters */} 
                    <Paper className={classes.root2}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                             <FormControl fullWidth>
                                  <TextField
                                      id="standard-select-currency-native"
                                      select
                                      label="Search by campus"
                                      value={searchCampus}
                                      onChange={handleChangeCampuses}
                                      SelectProps={{
                                        native: true,
                                      }}
                                    >
                                      {   loadingCampuses 
                                      ?
                                          <option></option> 
                                          :

                                          <Fragment>
                                              <option></option>
                                              {campuses.map((campus,id) => {
                                                return(
                                                <option key={id} value={campus.campusname}>{campus.campusname}</option>
                                                )
                                              })}
                                          </Fragment>
                                      }
                                    </TextField>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="searchDept"
                                name="searchDept"
                                label="Search by department"
                                fullWidth
                                className="classes.formControl"
                                value={searchDept}
                                autoComplete="searchDept"
                                onChange={handleChangeDept}
                             />
                        </Grid>
                    </Grid>
                        
                    </Paper>

                    <br /> 

             {/* Table Component for the records of the organization descriptions */ }
                    <Paper className={classes.root}>
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
                                    //Data to be displayed when the data is fetched
                                    <Fragment>
                                    {
                                       searchCampus === '' || rows.length === 0 ?
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
                                          <TableCell align="left">

                                          <Tooltip title="Update" placement="top">
                                             <IconButton href={"/ad/organizationlist/updaterecord/" + row.id} aria-label="edit" color="primary">
                                              <EditIcon />
                                            </IconButton>
                                          </Tooltip>   

                            
                                          <Tooltip title="Delete" placement="top">
                                             <IconButton aria-label="delete" color="secondary" onClick={ _ => deleteOrganization(row.id)}>
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
    
};

OrgListAdmin.propTypes = { 
    history: PropTypes.object.isRequired,
    orgDesc: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    orgDesc: state.orgDesc,
});

const mapDisPatchToProps = { getOrgDesc, deleteOrgDesc };

export default connect(mapStateToProps, mapDisPatchToProps)(withStyles(styles)(OrgListAdmin));

import React, {useState, useEffect, Fragment } from 'react';
import {
  Link,
} from "react-router-dom";
import { connect } from "react-redux";
import { getReports } from '../../actions/reportsActions';
import { getOrgDesc } from '../../actions/orgDescActions';

import moment from 'moment';

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'; 

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ArchiveIcon from '@material-ui/icons/Archive';
import GetAppIcon from '@material-ui/icons/GetApp';

//Admin Dashboard Component
import DashboardAdmin from '../layouts/DashboardAdmin';

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

// Style for the main Component 
const useStyles = makeStyles(theme => ({
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
   link: {
    display: 'flex',
    textDecoration: 'none',
     color: '#8c8c8c',
      '&:hover': {
   		 textDecoration: 'underline',
     	 }
	  },
	  textPrimary: {
 		display: 'flex',
	    textDecoration: 'none',
	    color: '#737373',
	      '&:hover': {
	   		 textDecoration: 'underline',
	     	 }
	  },
	  icon: {
	    marginRight: theme.spacing(0.5),
	    width: 20,
	    height: 20,
	  },
}));

function ViewOrgReports(props){

	const classes = useStyles();

	//States
	 // Pagination Controls 
     const [page, setPage] = useState(0);
     const [rowsPerPage, setRowsPerPage] = useState(10);

     const [searchByOrg, setSearchByOrg] = useState('');

	//Event Handlers
	//Getting the pages, Material UI Funcs
    const handleChangePage = (event, newPage) => {
          setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
       };


	//Component Effects

	useEffect(_ => {
		props.getReports();
		props.getOrgDesc();
	},[]);

	 const orgArr = props.orgDesc.sort((a,b) => a.created_at > b.created_at ? -1 : 1);

	           //Array of the reports in the lost item reports 
  //Amd filters it by chosen campus
  const rows = props.reports.records.sort((a, b) => (a.created_at > b.created_at ? -1 : 1));

  //Empty row that says the rows for pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  console.log(searchByOrg);

  return (
    <div>
             <DashboardAdmin>

             	<Breadcrumbs aria-label="breadcrumb">
			      		<Link to="/ad/filesandreports" className={classes.link}>
			      			<HomeIcon className={classes.icon}/>
			      			Menu
			      		</Link>

					        <Link
					          to={' '}
					          aria-current="page"
					          className={classes.textPrimary}
					        >
					        <ArchiveIcon className={classes.icon}/>
					        Archived
					        </Link>

			      	</Breadcrumbs>

			      	  {/* Search Component */}
			      	  <Paper>
			      	    <FormControl fullWidth className={classes.formControl}>

                                                <InputLabel htmlFor="orgname-simple">Organization</InputLabel>

                                                <Select
                                                    value={searchByOrg}
                                                    onChange={e => setSearchByOrg(e.target.value)}
                                                    inputProps={{
                                                        name: 'orgname',
                                                        id:'orgname-simple'
                                                    }}
                                                >
                                                {
                                                    props.orgDesc.loading ? 
                                                         <MenuItem></MenuItem>
                                                         :
                                                         // To access all the object data and use it in other components
                                                         // setthe response object as the value of the select component 
                                                         // and get the object data
                                                     orgArr.map(org => {
                                                        return <MenuItem  value={org.orgname}>{org.orgname}</MenuItem>
                                                         })
                                                }
                                                </Select>

                           </FormControl>
                        </Paper>
               <br />

				   	<Paper>
				    	 <div className={classes.tableWrapper}>

                             <Table className={classes.table} aria-label="custom pagination table">
                            {/* Table Head of the datas  */}
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Organization Name</StyledTableCell>
                                <StyledTableCell align="left">Campus</StyledTableCell>
                                <StyledTableCell align="left">Report Title</StyledTableCell>
                                <StyledTableCell align="left">Report Description</StyledTableCell>
                                <StyledTableCell align="left">File</StyledTableCell>
                                <StyledTableCell align="left">Date Submitted</StyledTableCell>
                              </TableRow>
                            </TableHead>

                          {/* Body for displaying the reports */}
                                <TableBody>
                                  { props.reports.loading
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
                                       searchByOrg === '' || rows.length === 0 ?
                                       <TableCell rowSpan={5} colSpan={8} style={{textAlign: 'center',}}>
                                       <ArrowUpwardIcon /><br></br>
                                       Pls search at the top to filter by campus...
                                     </TableCell>
                                      :
                                      (rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                      )
                                      .filter(row => row.orgname === searchByOrg)
                                      .map(row => (
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            {row.orgname}
                                          </TableCell>
                                          <TableCell align="left">{row.campus}</TableCell>
                                          <TableCell align="left">{row.reportTitle}</TableCell>
                                          <TableCell align="left">{row.reportDesc}</TableCell>
                                          <TableCell align="left">
                                          <a href={row.file}>
                                          	<GetAppIcon />
                                            </a>
                                          </TableCell>


                                          <TableCell align="left">{moment(row.created_at).format('YYYY-MM-DD')}</TableCell>
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
}

const mapStateToProps = state => ({
	reports: state.reports,
	orgDesc: state.orgDesc.records,
})

const mapDispatchToProps = { getReports, getOrgDesc };

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrgReports);
import React, {Fragment, useEffect, useState }from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/List';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

//Components
import Navbar from '../layouts/Navbar';


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


// Style for the LostItemReports Component 
const useStyles2 = makeStyles( theme => ({
  root: {
    width: '100%',
  },
  root2: {
    width: '100%',
    paddingBottom: '2 0px',
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
  },
  reportButton: {
    marginTop:15,
  },
   link: {
    display: 'flex',
  },
   icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));


 function FoundTable(props){
 	const classes = useStyles2();
 	  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  	const [search, setSearch] = useState('');

 	// State for the campuses 
 	const [campuses, getCampuses] = useState([]);
  	const [loadingCampuses, setLoadingCampuses] = useState(true);

  	// State for gettin the found reports 
  	const [reports, getReports] = useState([]);
  	const [loading, setLoading] = useState(true);

 	// Search Filtering function that filters the table
	  const handleChange = e => {
	    setSearch(e.target.value);
	  };

	//Getting the pages, Material UI Funcs
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 	useEffect( _ => {

 	const id = setInterval( _ => {

	//  Change the way of how to execute the function immidiately 
	  (async _ => {
	  const res = await axios.get('/api/campuses');
	    getCampuses(res.data);
	    setLoadingCampuses(false);

	   const res2 = await axios.get('/api/found/getreportfounditem');
	   	getReports(res2.data);
	   	setLoading(false);
	  })();

 	}, 2000);

 	return _ => {
 		clearInterval(id);
 	}


 	},[]);

 	const rows = reports.sort((a,b) =>(a.created_at > b.created_at ? -1 : 1))
 		.filter(row => row.campus === search);

  //Empty row that says the rows for pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
 	
  return (
    <div>
    		
    	<Navbar />

    		 <Container style={{paddingTop: 20}}>

	    		<Breadcrumbs aria-label="breadcrumb">
			        <Link color="inherit" href="/st/lostandfoundpage" className={classes.link}>
			          <HomeIcon className={classes.icon} />
			          Menu
			        </Link>

			        <Link
			          color="textPrimary"
			          href="/st/lostandfoundpage/foundreportslist"
			          aria-current="page"
			        >
			        <ListIcon className={classes.icon}/>
			          Lost Reports
			        </Link>
			    </Breadcrumbs>


			    	{/* Search bar  */}
      <Paper className={classes.root2}>

        <FormControl fullWidth>
          <TextField
              id="standard-select-currency-native"
              select
              label="Search by campus"
              value={search}
              onChange={handleChange}
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

      </Paper>

    		<br />

    	 	{/* Table Records for found */}
    	 	 <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-label="custom pagination table">
        {/* Table Head of the datas  */}
        <TableHead>
          <TableRow>
            <StyledTableCell>Found Item Detail</StyledTableCell>
            <StyledTableCell align="left">Date when the item is found</StyledTableCell>
            <StyledTableCell align="left">At what campus</StyledTableCell>
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
                   search === '' || rows.length === 0 ?
                   <TableCell rowSpan={5} colSpan={8} style={{textAlign: 'center',}}>
                   <ArrowUpwardIcon /><br></br>
                   Pls search at the top to filter by campus...
                 </TableCell>
                  :
                  (rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                  ).map(row => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.founditem}
                      </TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.campus}</TableCell>
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
};

export default FoundTable;
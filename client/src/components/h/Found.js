import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getFoundReports, deleteFoundReport } from '../../actions/lafActions';

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
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

// Dashboard Component  
import DashBoardHead from '../layouts/DashboardHead';
import FoundReportSuccessMsg from './FoundReportSuccessMsg';
import FoundDeleteMsg from './FoundDeleteMsg';

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
      }
});

const Found = (props) => {
	const classes = props;

	// Table pagination Actions states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

      // Loading for fetching datas 
    const [loading, setLoading] = useState(true);

      // Success message handling state 
  const [open, setOpen] = useState(false);

  // FoundDeleteMsg component state 
  const [open1 , setOpen1] = useState(false);

    //Success handlin message 
  const handleClose = (event, reason) => {
    if(reason === 'clickaway'){
        return
    }
    setOpen(false);
  };

   const handleClose1 = (event, reason) => {
    if(reason === 'clickaway'){
        return
    }
    setOpen1(false);
  };

  // Function for deleting a found data report with its specific id 
  const deleteFoundReport = id => {

    if(window.confirm("Are you sure to delete this records?")){
      props.deleteFoundReport(id);
      setOpen1(true)
    }

  };

     const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    useEffect( _ => {
      if(props.laf.found){
        setOpen(true)
      }
    },[props.laf.found]);

    useEffect( _ => {

      const id = setInterval( _ => {

      props.getFoundReports();
      setLoading(false);

      }, 2000) ;

      return _ => {
        clearInterval(id);
      }

    
    }, [])

  // This is the props for getting the details of the user 
  const auth = props.auth;

  //Array of the reports in the lost item reports 
  const rows = props.laf.reports.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
  .filter(row => auth.user.campus === row.campus );

    //Empty row that says the rows for pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
     <DashBoardHead>

     <FoundDeleteMsg open={open1} onClose={handleClose1} />
     <FoundReportSuccessMsg open={open} onClose={handleClose} />

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
                      <StyledTableCell>Name of Finder</StyledTableCell>
                      <StyledTableCell align="left">Found Item</StyledTableCell>
                      <StyledTableCell align="left">Campus of the found item</StyledTableCell>
                      <StyledTableCell align="left">Date Reported</StyledTableCell>
                      <StyledTableCell align="left">Action</StyledTableCell>
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
                            <TableCell component="th" scope="row">{row.findername}</TableCell>
                            <TableCell align="left">{row.founditem}</TableCell>
                            <TableCell align="left">{row.campus}</TableCell>
                            <TableCell align="left">{row.date}</TableCell>
                            <TableCell align="left">
                            	<IconButton 
                              aria-label="delete" 
                              color="secondary"
                              onClick={ _ => deleteFoundReport(row.id)}
                              >
                                  <DeleteIcon />
                                </IconButton>
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

       	   <div style={{ paddingTop: '20px'}}>
         		<Button href="/h/lostandfound/foundreports/addfoundrecord" size="small" variant="outlined" color="secondary">
                   	Add Records
                </Button>
           </div>

     </DashBoardHead>
  )
};

Found.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
     laf: state.laf
  });

const mapDispatchToProps = { getFoundReports, deleteFoundReport };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Found)));
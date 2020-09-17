import React, { useState, useEffect, useMemo, forwardRef, Fragment} from 'react';
import { connect } from "react-redux";
import { Link as Router } from "react-router-dom";
import  { getRecords, shareFilesFalse, deleteFiles, deleteFilesFalse } from '../../actions/fileSharingActions';
import moment from 'moment';

import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ShareIcon from '@material-ui/icons/Share';
import ViewListIcon from '@material-ui/icons/ViewList';
import ListAltIcon from '@material-ui/icons/ListAlt';

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
import Tooltip from '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import DashboardAdmin from '../layouts/DashboardAdmin';
import FormConfirmationMsg from './FormConfirmationMsg';

const Transition = props => {
    return <Slide direction="up" {...props} />
}

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
  breadcrumb: {
  	paddingBottom: 20
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

const LinkRouter = (props) => <Link {...props} component={Router} />;

function ViewSharedFiles(props){
	const classes = useStyles();

	//State
	const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [shared, setShared] = useState(false);
    const [id, getId] = useState(null);

          //Delete modal State
    const [deleteModal, openDeleteModal] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

	//Event Handlers
	  //Getting the pages, Material UI Funcs
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = id => {
  	getId(id);

  	openDeleteModal(true);
  };

   const handleDeleteModalClose = _ => {
          openDeleteModal(false)
    };

            // Event for openAdded state 
        const handleClose = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setShared(false);
                props.shareFilesFalse();
          };


            // Event for openAdded state 
        const handleCloseDeleted = (event, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setOpenDelete(false);
                props.deleteFilesFalse();
          };

      //Final action for deleting a file
    const deleteFinal = _ => {
    	props.deleteFiles(id);

    	openDeleteModal(false);
    	setOpenDelete(true);
    }

	//Component Effect
	useEffect(_ => {
		if(props.fileSharing.shared)
			setShared(true);

		setTimeout(function (){ props.shareFilesFalse()}, 6000)
		
	},[props.fileSharing.shared])

	useEffect(_ => {
		props.getRecords();
	},[props.fileSharing.deleted])

	useEffect(_ => {
		if(props.fileSharing.deleted)
			setOpenDelete(true)

		setTimeout( function(){ props.deleteFilesFalse() }, 6000)

	},[props.fileSharing.deleted])

	  //Array of the reports in the lost item reports 
  //Amd filters it by chosen campus
  const rows = props.fileSharing.records.sort((a, b) => (a.created_at > b.created_at ? -1 : 1));

  //Empty row that says the rows for pagination
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  	// console.log(props);

	return (
		<div>
			 <DashboardAdmin>

			 <Dialog
                   open={deleteModal}
                   TransitionComponent={Transition}
                   keepMounted
                   onClose={handleDeleteModalClose}
                   aria-labelledby="alert-dialog-slide-title"
                   aria-describedby="alert-dialog-slide-description"
                   >
                       <DialogTitle id="alert-dialog-slide-title">
                           {"Delete Announcement"}
                        </DialogTitle>

                        <DialogContent>

                          <DialogContentText id="alert-dialog-slide-description">
                              Are you sure to delete this shared file?
                              </DialogContentText>
                          </DialogContent>  

                          <DialogActions>
                            <Button onClick={deleteFinal} variant="outlined" color="primary">
                              Yes
                            </Button>
                            <Button onClick={handleDeleteModalClose} variant="outlined" color="secondary">
                              No
                            </Button>
                          </DialogActions>
                   </Dialog>

                <FormConfirmationMsg open={shared} onClose={handleClose} variant="success" message="Shared file Added."  />
                <FormConfirmationMsg open={openDelete} onClose={handleCloseDeleted} variant="success" message="Shared file Deleted."  />


			 <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
			      	 <LinkRouter className={classes.link} color="inherit" to="/ad/filesandreports/">
			      	 <ViewListIcon classes={classes.icon} />
	                  Menu
	                </LinkRouter>

	                <LinkRouter className={classes.link} color="inherit" to="/ad/filesandreports/shareFiles">
	                <ShareIcon classes={classes.icon} />
	                  Share Files
	                </LinkRouter>

	                <LinkRouter className={classes.link} color="inherit" to="/ad/filesandreports/shareFiles/list">
	                <ListAltIcon classes={classes.icon} />
	                  List
	                </LinkRouter>

			      	</Breadcrumbs>

			 	  <Paper className={classes.root2}>
                        <div className={classes.tableWrapper}>

                            <Table className={classes.table} aria-label="custom pagination table">
                            {/* Table Head of the datas  */}
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>File name</StyledTableCell>
                                <StyledTableCell align="left">Shared to:</StyledTableCell>
                                <StyledTableCell align="left">Date</StyledTableCell>
                                <StyledTableCell align="left">Actions</StyledTableCell>
                               </TableRow>
                            </TableHead>

                          {/* Body for displaying the reports */}
                                <TableBody>
                                  { props.fileSharing.loading
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
                                       No data to display...
                                     </TableCell>
                                      :
                                      (rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                      )
                                      //Filter the row by what will be typed in the search filter for department then map the result
                                      .map(row => (
                                        <TableRow>
                                          <TableCell component="th" scope="row">
                                            {row.fileName}
                                          </TableCell>
                                          <TableCell align="left">
                                          {
                                          	row.stud === 'student'
                                          	?
                                          	"Students"
                                          	:
                                          	"Student Organizations"
                                          }
                                          </TableCell>
                                          <TableCell align="left">{moment(row.created_at).format('YYYY-MM-DD')}</TableCell>
                                          <TableCell align="left">

                                          <Tooltip title="Delete" placement="top">
                                                 <IconButton onClick={_ => handleDelete(row.id)} aria-label="edit" color="secondary">
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

}

const mapStateToProps = state => ({
	fileSharing: state.fileSharing
});

const mapDispatchToProps = { getRecords, shareFilesFalse, deleteFiles, deleteFilesFalse };

export default connect(mapStateToProps, mapDispatchToProps)(ViewSharedFiles);
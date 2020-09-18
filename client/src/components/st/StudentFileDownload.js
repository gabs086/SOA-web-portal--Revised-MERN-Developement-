import React, {useState, useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import { getRecordsInStudents } from '../../actions/fileSharingActions'

import GetAppIcon from '@material-ui/icons/GetApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function StudentFileDownload(props) {

	useEffect(_ => {
		props.getRecordsInStudents();
	},[]);

	const rows = props.fileSharing.students.sort((a,b) => (a.created_at > b.created_at ? -1 : 1));

	return (
		<Dialog onClose={props.handleClose} 
		aria-labelledby="simple-dialog-title"
		open={props.open}
		>
		 <DialogTitle id="simple-dialog-title">Files that can be downloaded</DialogTitle>
		<List>
			{
				props.fileSharing.loadingStudent 
				?
				<ListItem>
		            <ListItemText primary="Loading..," />
		          </ListItem>
		         :
		         rows.map(row => (
			         <ListItem key={row.id}>
			            <ListItemAvatar>
			             	<a href={row.file} target="_blank">
                                 <GetAppIcon />
                             </a>
			            </ListItemAvatar>
			            <ListItemText primary={row.fileName} />
			          </ListItem>
		         	))
			}
		</List>
			
		</Dialog>
		);
}

const mapStateToProps = state => ({
	fileSharing: state.fileSharing
});

const mapDispatchToProps = { getRecordsInStudents };

export default connect(mapStateToProps, mapDispatchToProps)(StudentFileDownload);
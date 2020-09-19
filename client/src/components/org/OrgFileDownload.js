import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRecordsInOrg } from '../../actions/fileSharingActions'

import GetAppIcon from '@material-ui/icons/GetApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function OrgFileDownload(props) {

	useEffect(_ => {
		props.getRecordsInOrg();
	},[])

		const rows = props.fileSharing.orgs.sort((a,b) => (a.created_at > b.created_at ? -1 : 1));

	return (

		<Dialog onClose={props.handleClose} 
		aria-labelledby="simple-dialog-title"
		open={props.open}
		>
		 <DialogTitle id="simple-dialog-title">Files that can be downloaded</DialogTitle>
		<List>
			{
				props.fileSharing.loadingOrg 
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

const mapDispatchToProps = { getRecordsInOrg };

export default connect(mapStateToProps, mapDispatchToProps)(OrgFileDownload);
import React, { useMemo, forwardRef, Fragment} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';

// Component for having a sidebar with links on it 
function ListItemLink(props) {
    // props to be included in the component 
    const { icon, primary, to , count} = props;

    // Function for rendering the component everytime the listlink is clicked  
    const renderLink = useMemo(
        _ => forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    );

    return (
       <li>
           <ListItem button component={renderLink}>
               
                {
                // If icon props is included 
                icon ? 
                <Fragment>
                  
                    {
                        // If count props is included 
                        count 
                        ?
                        <ListItemIcon>
                            <Badge badgeContent={count} color="primary">
                            {icon}
                            </Badge>
                        </ListItemIcon> 
                        
                        :
                        <ListItemIcon>{icon}</ListItemIcon> 
                    }
                    </Fragment>
                : null}
                <ListItemText primary={primary} />
           </ListItem>
       </li>
    )
}

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  };

export default ListItemLink;
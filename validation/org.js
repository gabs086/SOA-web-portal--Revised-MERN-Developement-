const Validator = require('validator');
const isEmpty = require('is-empty');

const validateOrgAccnts = data => {

	let errors = {};


	data.orgname = !isEmpty(data.orgname) ? data.orgname : '';
	data.username = !isEmpty(data.username) ? data.username : '';
	data.password = !isEmpty(data.password) ? data.password : '' ;

	const orgname = data.orgname;
	const username = data.username;
	const password = data.password;


	if(Validator.isEmpty(orgname))
		errors.orgname = "Please select an organization to register";

	// Check for usename 
	if(Validator.isEmpty(username))
		errors.username = 'Username is Required';

	// Check For password 
	if(Validator.isEmpty(password))
		errors.password = 'Password is Required';

	if(!Validator.isLength(password, { min: 6, max: 30} ))
		errors.password = 'Password must be at least 6 characters'

	return { errors, isValid: isEmpty(errors) };

};

module.exports = validateOrgAccnts;
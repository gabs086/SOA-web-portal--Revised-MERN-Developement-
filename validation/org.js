const Validator = require('validator');
const isEmpty = require('is-empty');

const validateOrgAccnts = data => {

	let errors = {};


	data.orgname = !isEmpty(data.orgname) ? data.orgname : '';

	const orgname = data.orgname;

	if(Validator.isEmpty(orgname))
		errors.orgname = "Please select an organization to register";

	return { errors, isValid: isEmpty(errors) };
};

module.exports = validateOrgAccnts;
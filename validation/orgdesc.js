//Validator to check if the all the that is empty or not
const Validator = require('validator');
const isEmpty = require('is-empty');

//Va;idation function for the orgdesc process
const validateOrgDesc = data => {
	let errors = {};

	data.campus = !isEmpty(data.campus) ? data.campus : '';
	data.department = !isEmpty(data.department) ? data.department : ''; 
	data.orgname = !isEmpty(data.orgname) ? data.orgname : '';
	data.orgpresname = !isEmpty(data.orgpresname) ? data.orgpresname : '';
	data.orgadvisername = !isEmpty(orgadvisername) ? data.orgadvisername : '';
	data.quantitymembers = !isEmpty(quantitymembers) ? data.quantitymembers : '';
	data.quantityofficers = !isEmpty(quantityofficers) ? data.quantityofficers : '';

	const campus = data.campus;
	const department = data.department;
	const orgname = data.orgname;
	const orgpresname = data.orgpresname;
	const orgadvisername = data.orgadvisername;
	const quantitymembers = data.quantitymembers;
	const quantityofficers = data.quantityofficers;

	if(Validator.isEmpty(campus))
		errors.campus = "Choosing a campus for this registering organization is required";

	if(Validator.isEmpty(department))
		errors.department = "Choosing a department for this registering organization is required";

	if(Validator.isEmpty(orgname))
		errors.orgname = "Please include what will be the name of the organization";

	if(Validator.isEmpty(orgpresname))
		errors.orgpresname = "Please include the name of the president of the organization";

	if(Validator.isEmpty(orgadvisername))
		errors.orgadvisername = "Please include the name of the adviser of the organization";

	if(Validator.isEmpty(quantitymembers))
		errors.quantitymembers = "Please include the quantity of its members";

	if(Validator.isEmpty(quantityofficers))
		errors.quantityofficers = "Please include the quantity of its officers";

	return { errors, isValid: isEmpty(errors)};
};

module.exports = validateOrgDesc;
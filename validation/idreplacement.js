const Validator = require('validator');
const isEmpty = require('is-empty');

const validateIdReplacement = data => {

	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.year = !isEmpty(data.year) ? data.year : '';
	data.src = !isEmpty(data.src) ? data.src : '';
	data.campus = !isEmpty(data.campus) ? data.campus : '';
	data.department = !isEmpty(data.department) ? data.department : '';
	data.idreason = !isEmpty(data.idreason) ? data.idreason : '';
	data.count = !isEmpty(data.count) ? data.count : '';

	const name = data.name;
	const year = data.year;
	const src = data.src;
	const campus = data.campus;
	const department = data.department;
	const idreason = data.idreason;
	const count = data.count;

	if(Validator.isEmpty(name))
		errors.name = "Name of the student is required.";

	if(Validator.isEmpty(year))
		errors.years = "What year of college the student is.";

	if(Validator.isEmpty(src))
		errors.src = "SR-Code of the student is required.";

	if(Validator.isEmpty(campus))
		errors.campus = 'Campus of the student is required';

	if(Validator.isEmpty(department))
		errors.department = 'Department of the student is required';

	if(Validator.isEmpty(idreason))
		errors.idreason = "Please specify the reason why the student is having a replacement of ID.";

	if(Validator.isEmpty(count))
		errors.count = "Please indicate how many times the student have an ID Replacement record.";

	return { errors, isValid: isEmpty(errors) }


};

module.exports = validateIdReplacement;
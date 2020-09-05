const Validator = require('validator');
const isEmpty = require('is-empty');

const validateReports = data => {
	let errors = {}

	data.reportTitle = !isEmpty(data.reportTitle) ? data.reportTitle : '';
	data.reportDesc = !isEmpty(data.reportDesc) ? data.reportDesc : '';

	const reportTitle = data.reportTitle;
	const reportDesc = data.reportDesc;

	if(Validator.isEmpty(reportTitle))
		errors.reportTitle = "Title of your report is required";

	if(Validator.isEmpty(reportDesc))
		errors.reportDesc = "Description of your report is required";

	return { errors, isValid: isEmpty(errors) };	
}

module.exports = validateReports;
const Validator = require('validator');
const isEmpty = require('is-empty');

const validateRegisteredStudents = data => {
	let errors = {};

	data.studentName = !isEmpty(data.studentName) ? data.studentName : '';
	data.srCode = !isEmpty(data.srCode) ? data.srCode : '';
	data.department = !isEmpty(data.department) ? data.department : '';
	data.yr = !isEmpty(data.yr) ? data.yr : '';
	data.section = !isEmpty(data.section) ? data.section : '';
	data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : '';

	const { studentName, srCode, department,
			yr, section, contactNumber
	} = data;

	if(Validator.isEmpty(studentName))
		errors.studentName = "Your name is required";

	if(Validator.isEmpty(srCode))
		errors.srCode = "Your SR-Code is required";

	if(Validator.isEmpty(department))
		errors.department = "What is your department?";

	if(Validator.isEmpty(yr))
		errors.yr = "What is your department?";

	if(Validator.isEmpty(yr))
		errors.yr = "Select your college year";

	if(Validator.isEmpty(section))
		errors.section = "Enter your current section";

	if(Validator.isEmpty(contactNumber))
		errors.contactNumber = "Enter your contact number so we can contact you for the activity you join";

	return { errors, isValid: isEmpty(errors) };
};

module.exports = validateRegisteredStudents;
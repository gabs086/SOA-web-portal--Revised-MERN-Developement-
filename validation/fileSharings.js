const Validator = require('validator');
const isEmpty = require('is-empty');

const validateFiles = data => {
	let errors = {}

	data.stud = !isEmpty(data.stud) ? data.stud : '';

	const stud = data.stud;

	if(Validator.isEmpty(stud))
		errors.stud = "Please choose in the selection who will receive the ";

	return { errors, isValid: isEmpty(errors) };	
}

module.exports = validateFiles;
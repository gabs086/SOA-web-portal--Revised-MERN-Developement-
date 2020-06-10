const Validator = require('validator');
const isEmpty = require('is-empty');

const validateRequestActivities = data => {

	let errors = {}

	data.activity_title = !isEmpty(data.activity_title) ? data.activity_title : '';
	data.description = !isEmpty(data.description) ? data.description : '';

	const activity_title = data.activity_title;
	const file = data.file;
	const description = data.description;

	if(Validator.isEmpty(activity_title))
		errors.activity_title = 'Title of the activity is required';

	if(Validator.isEmpty(description))
		errors.description = 'Please input some description so the reviewer will have a idea of the the request is';

	return { errors, isValid: isEmpty(errors)};
};

module.exports = validateRequestActivities;
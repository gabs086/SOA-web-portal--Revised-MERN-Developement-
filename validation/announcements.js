const Validator = require('validator');
const isEmpty = require('is-empty');

const validateAnnouncements = data => {

	let errors = {};

	const today = new Date();

	data.title = !isEmpty(data.title) ? data.title : '';
	data.venue = !isEmpty(data.venue) ? data.venue : '';
	data.description = !isEmpty(data.description) ? data.description : '';

	const title = data.title;
	const venue = data.venue;
	const description = data.description;

	const dateSet = new Date(data.date);

	if(Validator.isEmpty(title))
			errors.title = "Title for the Event is required";

	if(Validator.isEmpty(venue))
			errors.venue = "Venue is required for the event";

	if(Validator.isEmpty(description))
			errors.description = "description is required for the event";

	if(dateSet.getTime() < today.getTime())
			errors.date = "Date set cannot be in the past :)";


	return { errors, isValid: isEmpty(errors) };

};

module.exports = validateAnnouncements;
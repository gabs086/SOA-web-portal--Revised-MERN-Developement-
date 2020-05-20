const Validator = require('validator');
const isEmpty = require('is-empty');

// validation for Found Reports
const validateFoundReports = data => {
	let errors = {}

	data.findername = !isEmpty(data.findername) ? data.findername : '';
	data.founditem = !isEmpty(data.founditem) ? data.founditem : '';
	data.campus = !isEmpty(data.campus) ? data.campus : '' ;
	data.date = !isEmpty(data.date) ? data.date : '';


	const findername = data.findername;
	const founditem = data.founditem;
	const campus = data.campus;
	const date = data.date;


	if(Validator.isEmpty(findername))
			errors.findername = "Name of the finder is important";

	if(Validator.isEmpty(founditem))
			error.founditem = "Item Details is important";

	if(Validator.isEmpty(campus))
			errors.campus = "What campus the item is found";

	if(Validator.isEmpty(date))
			errors.date = "Date when the item is found is important";

	return { errors, isValid: isEmpty(errors) };
};

module.exports = validateFoundReports;
const Validator = require('validator');
const isEmpty = require('is-empty');

const validateAssessment = data => {
	let errors = {};

	const today = new Date();

	data.activity = !isEmpty(data.activity) ? data.activity: '';
	data.activityRequirements = !isEmpty(data.activityRequirements) ? data.activityRequirements: '';
	data.description = !isEmpty(data.description) ? data.description : '';

	const activity = data.activity;
	const activityRequirements = data.activityRequirements;
	const description = data.description;

	const dateSet = new Date(data.date);

	if(Validator.isEmpty(activity))
		errors.activity = "Name of the activity to implements is required";

	if(Validator.isEmpty(activityRequirements))
		errors.activityRequirements = "Please Indicate the requirements/instructions for the activity";

	if(Validator.isEmpty(description))
		errors.description = "Description for the activity is required";

	if(dateSet.getTime() < today.getTime())
		errors.date = "Date set cannot be in the past :)";



	return { errors, isValid: isEmpty(errors) };
};

module.exports = validateAssessment;
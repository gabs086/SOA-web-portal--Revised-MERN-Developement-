const Validator = require('validator');
const isEmpty = require('is-empty');

const validateLoginInput = data => {

    // Error object
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //Username Field Validation
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username is required";
    }
    //Password Field Validation
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is Required";
    }

    return { errors, isValid: isEmpty(errors) };

};
module.exports = validateLoginInput;
const Validator = require('validator');
const isEmpty = require('is-empty');

//Validation for Lost and Found
const validateLostAndFoundInput = data => {
    let errors = {}
    // Name of the student 
    data.studentname = !isEmpty(data.studentname) ? data.studentname : '';
    // Students SR-Code 
    data.sr_code = !isEmpty(data.sr_code) ? data.sr_code : '';
    // Campus of their school 
    data.campus = !isEmpty(data.campus) ? data.campus : '';
    // What Department 
    data.department = !isEmpty(data.department) ? data.department : '';
    //What Course
    data.course = !isEmpty(data.course) ? data.course : '';
    // Details of the lost item Report 
    data.details = !isEmpty(data.details) ? data.details : '';
    // Contact if its or Number 
    data.contact = !isEmpty(data.contact) ? data.contact : '';

    const studentName = data.studentname;
    const srCode = data.sr_code;
    const campus = data.campus;
    const department = data.department;
    const course = data.course;
    const details = data.details;
    const contact = data.contact;


    if(Validator.isEmpty(studentName))
        errors.studentname = "Your Name is Required. Please input your name";
    
    if(Validator.isEmpty(srCode))
        errors.sr_code = "Your SR-CODE is required. Please input your SR-CODE";

    if(Validator.isEmpty(campus))
        errors.campus = "Please include what campus in BatStateU are you in";

    if(Validator.isEmpty(department))
        errors.department = "Please include what department you are in the university";

    if(Validator.isEmpty(course))
        errors.course = "Please include what is your course your studying";

    if(Validator.isEmpty(details))
        errors.details = "Please include the details of your report so we can track and check your lost item when someone report a found item";

    if(Validator.isEmpty(contact)){
        errors.contact = "Please include your contact details";
    } 
    else if(!Validator.isEmail(contact)){
        errors.contact = "Your contact must be an email";
    }
    else if(!Validator.isInt(contact)){
        errors.contact = "Your contact must be aa phone number of yours";
    }
       
    return { errors, isValid: isEmpty(errors) };

};

module.exports = validateLostAndFoundInput;
const Validator = require('validator');
const isEmpty = require('is-empty');

//Validation for Lost and Found
const validateLostAndFoundInput = data => {
    let errors = {}
    // Name of the student 
    data.name = !isEmpty(data.name) ? data.name : '';
    // Students SR-Code 
    data.src = !isEmpty(data.src) ? data.src : '';
    // College year of students 
    data.yr = !isEmpty(data.yr) ? data.yr : '' ;
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

    const studentName = data.name;
    const src= data.src;
    const yr = data.yr;
    const campus = data.campus;
    const department = data.department;
    const course = data.course;
    const details = data.details;
    const contact = data.contact;


    if(Validator.isEmpty(studentName))
        errors.name = "Your Name is Required. Please input your name";
    
    if(Validator.isEmpty(src))
        errors.SRcode = "Your SR-CODE is required. Please input your SR-CODE";
    
    if(Validator.isEmpty(yr))
        errors.yr = "Your year of college is required. Please input your college year";

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

    if(!Validator.isEmail(contact) && !Validator.isInt(contact)){
            errors.contact = "Your contact must be an email or a phone number you have";
        }
       
    return { errors, isValid: isEmpty(errors) };

};

module.exports = validateLostAndFoundInput;
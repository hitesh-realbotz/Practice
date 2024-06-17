const { REGEX_EMAIL, DATA_TYPE_STRING, VALID_STATUS, REGEX_DATE } = require("../configuration/constants");

//Valiadates individual field
const validate = (name, value) => {
    switch (name) {
        case 'email':
            return isUndefinedOrNull(value) ? `Email can not be undefined or null` : validateType(value, DATA_TYPE_STRING) 
                    ? 'Email must be string type' 
                    : (!value.trim() 
                        ? 'Email is Required.' 
                        : (!validateEmail(value) ? 'Invalid email format' : ''));
        case 'password':
            return isUndefinedOrNull(value) ? `Password can not be undefined or null` : validateType(value, DATA_TYPE_STRING) 
                    ? 'Password must be string type' 
                    : (!value.trim() 
                        ? 'Password is Required.' 
                        : (value.length < 6 ? 'Password must be min. 6 character!' : ''));
        case 'title':
            return validateType(value, DATA_TYPE_STRING) 
                    ? 'Title must be string type' 
                    : !value.trim() ? 'Title is Required.' : '' ;
        case 'description':
            return validateType(value, DATA_TYPE_STRING) 
                    ? 'description must be string type' 
                    : !value.trim() ? 'description is Required.' : '' ;
        case 'status':
            return isUndefinedOrNull(value) ? `Status can not be undefined or null` : validateType(value, DATA_TYPE_STRING) 
                    ? 'description must be string type' 
                    : !value.trim() 
                        ? 'description is Required.' 
                        : (!isValidStatus(value) ? 'Invalid status' : '') ;
        case 'dueDate':
            return isUndefinedOrNull(value) 
                        ? `Due-Date can not be undefined or null` 
                        : !value.trim() ? 'DueDate is Required.' : validateDateFormat(value) ;
                    
        default:
            return `Invalid input for ${name}`;
    }
}


const isUndefinedOrNull = (value) => {
    return value === undefined || value === null;
}
const validateType = (value, type) => {
    return typeof value !== type;
}

//Status validation
const isValidStatus = (status) => {
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const statusOptions = VALID_STATUS;
    return statusOptions.includes(status);
};
//Email validation
const validateEmail = (email) => {
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailPattern = REGEX_EMAIL;
    return emailPattern.test(email);
};

//Date type validation
const validateDateFormat = (date) => {
    const datePattern = REGEX_DATE;
    console.log("Date Validation ", date, datePattern.test(date) );
    if (datePattern.test(date)) {
        return '';
    }
    return 'Invalid Date format. Please use YYYY-MM-DD';
};

//Form Validation
const validateFields = (data) => {
    const names = Object.keys(data);
    const values = Object.values(data);
    const errorMessages = [];
    // let isValid = true;
    names.forEach((name, index) => {
        const errorMessage = validate(names[index], values[index]);
        if (!!errorMessage) {
            // isValid = false;
            errorMessages.push(errorMessage);
        }
    });
    // return { errors: updatedErrorMessages, isValid: isValid };
    return errorMessages;
}

module.exports = { validate, validateFields }
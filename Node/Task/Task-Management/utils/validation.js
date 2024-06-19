const { REGEX_EMAIL, DATA_TYPE_STRING, VALID_STATUS, REGEX_DATE, REGEX_DIGIT_ONLY } = require("../configuration/constants");

//Valiadates individual field
const validate = (name, value) => {
    switch (name) {
        case 'email':
            return isUndefinedOrNull(value) ? `Email can not be undefined or null` : !isTypeMatched(value, DATA_TYPE_STRING)
                ? 'Email must be string type'
                : (!value.trim()
                    ? 'Email is Required.'
                    : (!validateEmail(value) ? 'Invalid email format' : ''));
        case 'password':
            return isUndefinedOrNull(value) ? `Password can not be undefined or null` : !isTypeMatched(value, DATA_TYPE_STRING)
                ? 'Password must be string type'
                : (!value.trim()
                    ? 'Password is Required.'
                    : (value.length < 6 ? 'Password must be min. 6 character!' : ''));
        case 'title':
            return !isTypeMatched(value, DATA_TYPE_STRING)
                ? 'Title must be string type'
                : !value.trim() ? 'Title is Required.' : '';
        case 'description':
            return !isTypeMatched(value, DATA_TYPE_STRING)
                ? 'description must be string type'
                : !value.trim() ? 'description is Required.' : '';
        case 'status':
            return isUndefinedOrNull(value) ? `Status can not be undefined or null` : !isTypeMatched(value, DATA_TYPE_STRING)
                ? 'description must be string type'
                : !value.trim()
                    ? 'description is Required.'
                    : (!isValidStatus(value) ? 'Invalid status' : '');
        case 'dueDate':
            return isUndefinedOrNull(value)
                ? `Due-Date can not be undefined or null`
                : !value.trim() ? 'DueDate is Required.' : validateDateFormat(value);
        case 'pageNo':
            return isUndefinedOrNull(value)
                ? ''
                : (!validateIsNumeric(value)
                    ? 'Page No. must contain only digits!'
                    : '');
        case 'itemsPerPage':
            return isUndefinedOrNull(value)
                ? ''
                : (!validateIsNumeric(value)
                    ? 'Items per page must contain only digits!'
                    : '');
        case 'sortOrder':
            return isUndefinedOrNull(value)
                ? ''
                : (!isBoolean(value)
                    ? 'Sort Order must be either true or false!'
                    : '');
        
        default:
            return `Invalid input for ${name}`;
    }
}

//Returns true for undefined or null value
const isUndefinedOrNull = (value) => {
    return value === undefined || value === null;
}

//Returns true for boolean value
const isBoolean = (value) => {
    return value?.toLowerCase() === "true" || value?.toLowerCase() === "false";
}

//Returns true if type of value matches provided type
const isTypeMatched = (value, type) => {
    return typeof value === type;
}

//Date type validation
const validateDateFormat = (date) => {
    const datePattern = REGEX_DATE;
    console.log("Date Validation ", date, datePattern.test(date));
    if (datePattern.test(date)) {
        return '';
    }
    return 'Invalid Date format. Please use YYYY-MM-DD';
};

//Numeric validation
const validateIsNumeric = (value) => {
    const numericPattern = REGEX_DIGIT_ONLY;
    return numericPattern.test(value);
};

//Email validation
const validateEmail = (email) => {
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailPattern = REGEX_EMAIL;
    return emailPattern.test(email);
};

//Status validation
const isValidStatus = (status) => {
    const statusOptions = VALID_STATUS;
    return statusOptions.includes(status);
};


//Fields Validation
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
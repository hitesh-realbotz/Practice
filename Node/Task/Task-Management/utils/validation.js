const { REGEX_EMAIL, DATA_TYPE_STRING } = require("../configuration/constants");

//Valiadates individual field
const validate = (name, value) => {
    switch (name) {
        case 'email':
            return validateType(value, DATA_TYPE_STRING) ? 'Email must be string type' : !value.trim() ? 'Email is Required.' : (!validateEmail(value) ? 'Invalid email format' : '');
        case 'password':
            return validateType(value, DATA_TYPE_STRING) ? 'Password must be string type' :  !value.trim() ? 'Password is Required.' : (value.length < 6 ? 'Password must be min. 6 character!' : '');
        default:
            return '';
    }
}


const validateType = (value, type) => {
    return typeof value !== type;
}

//Email validation
const validateEmail = (email) => {
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailPattern = REGEX_EMAIL;
    return emailPattern.test(email);
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
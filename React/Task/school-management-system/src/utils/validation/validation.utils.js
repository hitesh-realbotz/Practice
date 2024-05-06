import { CONSTANTS } from "../../constants/constants";

//Valiadates individual field
export const validate = (name, value) => {
    switch (name) {
        case 'email':
            return !value.trim() ? 'Email is Required.' : (!validateEmail(value) ? 'Invalid email format' : '');
        case 'password':
            return !value.trim() ? 'Password is Required.' : (value.length < 6 ? 'Password must be min. 6 character!' : '');
        case 'name':
            return !value.trim() ? 'Name is Required' : '';
        case 'title':
            return !value.trim() ? 'Title is Required' : '';
        case 'description':
            return !value.trim() ? 'Description is Required' : '';
        case 'status':
            return !value.trim() ? 'Status is Required' : '';
        case 'standard':
            return !value ? 'Standard must be selected' : '';
        case 'division':
            return !value ? 'Division must be selected' : '';
        case 'rollNo':
            return !value ? 'Roll No. must be selected' : '';
        case 'subject':
            return !value ? 'Favourite Subject must be selected' : '';
        case 'dob':
            if (!value)
                return 'Date of Birth is Required';
            return validateDateFormat(value);
        case 'startDate':
            if (!value)
                return 'Start Date is Required';
            return validateDateFormat(value);
        case 'endDate':
            if (!value)
                return '';
            return validateDateFormat(value);

        default:
            return '';
    }
}

//Email validation
const validateEmail = (email) => {
    const emailPattern = CONSTANTS.REGEX_EMAIL;
    return emailPattern.test(email);
};

//Date type validation
const validateDateFormat = (date) => {
    const datePattern = CONSTANTS.REGEX_DATE;
    if (datePattern.test(date)) {
        return '';
    }
    return 'Invalid Date format. Please use MM-DD-YYYY';
};


//Form Validation
export const validateForm = (names, values, errorMessages) => {
    console.log('In Validat errorMessages ', errorMessages);
    const updatedErrorMessages = { ...errorMessages };
    const errorMessagesKeys = Object.keys(updatedErrorMessages);
    let isValid = true;
    errorMessagesKeys.forEach((name, index) => {
        const errorMessage = validate(names[index], values[index]);
        if (!!errorMessage) {
            isValid = false;
        }
        updatedErrorMessages[`${names[index]}Error`] = errorMessage;
        console.log('In Validat errorMess POST ', updatedErrorMessages[name], names[index], values[index]);
    });
    return { errors: updatedErrorMessages, isValid: isValid };
    // return isValid;
}


//Returns updated validation/error messages
export const getUpdatedErrorMsg = (errorTag, fieldname, value, errorMessages) => {
    const updatedErrorMessages = { ...errorMessages };
    const errorMessagesKeys = Object.keys(updatedErrorMessages);
    // const errorMessagesValues = Object.values(updatedErrorMessages);
    errorMessagesKeys.forEach((name, index) => {
        if (name === errorTag) {
            updatedErrorMessages[name] = validate(fieldname, value);
        } else {
            // updatedErrorMessages[name] = errorMessagesValues[name];
        }
    });
    return updatedErrorMessages;
}

//Returns conflict error messages
export const getConflictMessages = (conflicts, errorTag, errorMessage) => {
    conflicts.conflicts.push({
        field: errorTag, message: errorMessage
    });
    return conflicts;
}
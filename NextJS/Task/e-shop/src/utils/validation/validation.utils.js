import { REGEX_EMAIL } from "@/config/constants";

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
        // case 'dob':
        //     if (!value) return 'Date of Birth is Required';
        //     return validateDateFormat(value);
        // case 'startDate':
        //     if (!value) return 'Start Date is Required';
        //     return validateDateFormat(value);
        // case 'endDate':
        //     if (!value) return 'End Date is Required';
        //     return validateDateFormat(value);

        default:
            return '';
    }
}

//Email validation
const validateEmail = (email) => {
    const emailPattern = REGEX_EMAIL;
    return emailPattern.test(email);
};

// //Date type validation
// const validateDateFormat = (date) => {
//     const datePattern = CONSTANTS.REGEX_DATE;
//     if (datePattern.test(date)) {
//         return validateIsFutureDate(date);
//     }
//     return 'Invalid Date format. Please use MM-DD-YYYY';
// };
// //FutureDate validation
// const validateIsFutureDate = (date) => {
//     if (new Date(date) > new Date()) return 'Future date not allowed!';
//     return '';
// };


//Form Validation
export const validateForm = (names, values, errorMessages) => {
    const updatedErrorMessages = { ...errorMessages };
    const errorMessagesKeys = Object.keys(updatedErrorMessages);
    let isValid = true;
    errorMessagesKeys.forEach((name, index) => {
        const errorMessage = validate(names[index], values[index]);
        if (!!errorMessage) {
            isValid = false;
        }
        updatedErrorMessages[`${names[index]}Error`] = errorMessage;
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
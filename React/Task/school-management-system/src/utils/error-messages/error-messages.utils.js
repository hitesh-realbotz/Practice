import { CONSTANTS } from "../../constants/constants";

export const validate = (name, value) => {


    switch (name) {
        case 'email':
            return !value.trim() ? 'Email is Required.' : (!validateEmail(value) ? 'Invalid email format' : '');
        case 'password':
            return !value.trim() ? 'Password is Required.' : (value.length < 6 ? 'Password must be min. 6 character!' : '');
        case 'name':
            return !value.trim() ? 'Name is Required' : '';
        case 'standard':
            return !value ? 'Standard must be selected' : '';
        case 'division':
            return !value ? 'Division must be selected' : '';
        case 'rollNo':
            return !value ? 'Roll No. must be selected' : '';
        case 'subject':
            return !value ? 'Favourite Subject must be selected' : '';
        case 'dob':
            if (!value) {
                return 'Date of Birth is Required';
            }
            // Assuming dob should be in the format YYYY-MM-DD
            const dobPattern = CONSTANTS.REGEX_DOB;
            if (!dobPattern.test(value)) {
                return 'Invalid Date of Birth format. Please use YYYY-MM-DD';
            }
            return '';

        default:
            return '';
    }
}


const validateEmail = (email) => {
    const emailPattern = CONSTANTS.REGEX_EMAIL;
    return emailPattern.test(email);
};

export const validateForm = (names, values, errorMessages) => {
    console.log('In Validat errorMessages ', errorMessages);

    let isValid = true;
    errorMessages.forEach((name, index) => {
        if (!!validate(names[index], values[index])) {
            isValid = false;
        }

        console.log('In Validat errorMess ', errorMessages[name], names[index], values[index]);
        errorMessages[`${names[index]}Error`] = validate(names[index], values[index]);
        console.log('In Validat errorMess POST ', errorMessages[name], names[index], values[index]);
    });
    return { errors: errorMessages, isValid: isValid };
    // return isValid;
}

export const getConflictMessages = (conflicts, errorTag, errorMessage) => {
    conflicts.conflicts.push({
        field: errorTag, message: errorMessage
    });
    return conflicts;
}

export const getUpdatedErrorMsg = (errorTag, fieldname, value, errorMessages) => {
    const updatedErrorMessages = { ...errorMessages };
    const errorMessagesKeys = Object.keys(updatedErrorMessages);
    const errorMessagesValues = Object.values(updatedErrorMessages);
    errorMessagesKeys.forEach((name, index) => {
        if (name == errorTag) {
            updatedErrorMessages[name] = validate(fieldname, value);
        } else {
            // updatedErrorMessages[name] = errorMessagesValues[name];
        }
    });
    return updatedErrorMessages;
}
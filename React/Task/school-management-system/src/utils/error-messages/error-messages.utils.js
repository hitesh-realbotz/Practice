import { CONSTANTS } from "../../constants/constants";

export const validate = (name, value) => {

    
    switch (name) {
        case 'email':
            return !value.trim() ? 'Email is Required.' : (!validateEmail(value) ? 'Invalid email format' : '');
        case 'name':
            return !value.trim() ? 'Name is Required' : '';
        case 'standard':
            return !value ? 'Standard must be selected' : 'Check';
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

    names.forEach((name, index) => {
        console.log(validate(name, values[index]));    
        errorMessages[name] = validate(name, values[index]);
    });
    console.log(errorMessages)
    return errorMessages;
}
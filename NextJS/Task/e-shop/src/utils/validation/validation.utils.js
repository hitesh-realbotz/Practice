import { REGEX_DIGIT_ONLY, REGEX_EMAIL } from "@/config/constants";
import { useSelector } from "react-redux";

//Valiadates individual field
export const validate = (name, value) => {
    switch (name) {
        case 'email':
            return !value.trim() ? 'Email is Required.' : (!validateEmail(value) ? 'Invalid email format!' : '');
        case 'password':
            return !value.trim() ? 'Password is Required.' : (value.length < 6 ? 'Password must be min. 6 character!' : '');
        case 'answer':
            return !value.trim() ? 'Answer is Required.' : '';

        case 'securityQuestion':
            return !value ? 'Security Question must be selected.' : '';
        
        case 'shippingMethod':
            return !value ? 'Shipping Method must be selected.' : '';
        case 'buyerName':
            return !value.trim() ? 'Buyer Name is Required.' : '';
        case 'address':
            return !value.trim() 
                    ? 'Adddress is Required.' 
                    : (validateIsNumeric(value) 
                            ? 'Invalid address!.' 
                            : (value.length < 10 ? 'Adddress must be min. 10 character!' : ''));
        case 'contactNo':
            return !value.trim() 
                    ? 'Contact No. is Required.' 
                    : (!validateIsNumeric(value) 
                            ? 'Contact No. must contain only digits!' 
                            : (value.length != 10 ? 'Contact No. must be 10 digit!' : ''));
        case 'cardNo':
            return !value.trim() 
                    ? 'Card No. is Required.' 
                    : (!validateIsNumeric(value) 
                            ? 'Card No. must contain only digits!' 
                            : (value.length != 16 ? 'Card No. must be 16 digit!' : ''));
        case 'cvv':
            return !value.trim() 
                    ? 'CVV is Required.' 
                    : (!validateIsNumeric(value) 
                            ? 'CVV must contain only digits!' 
                            : (value.length != 3 ? 'CVV must be 3 digit!' : ''));
        case 'pin':
            return !value.trim() 
                    ? 'Pin is Required.' 
                    : (!validateIsNumeric(value) 
                            ? 'Pin must contain only digits!' 
                            : (value.length != 6 ? 'Pin must be 6 digit!' : ''));
        case 'amount':
            return !value 
                    ? 'Amount is Required.' 
                    : (!validateIsNumeric(value) 
                            ? 'Amount must contain only digits!' 
                            : (value <= 0 ? 'Amount must be min. 1!' : ''));

        default:
            return '';
    }
}

//Email validation
const validateEmail = (email) => {
    const emailPattern = REGEX_EMAIL;
    return emailPattern.test(email);
};
//Numeric validation
const validateIsNumeric = (value) => {
    const numericPattern = REGEX_DIGIT_ONLY;
    return numericPattern.test(value);
};


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


export const isAuthenticated = () => {
    const user = useSelector((data) => data?.usersData?.userData);
    return true;
}
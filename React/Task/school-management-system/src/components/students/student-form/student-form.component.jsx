import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormInput from '../../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../../button/button.component';


import { ButtonsContainer, StudentFormContainer, RowContainer } from './student-form.styles';
import DropdownInput from '../../form-dropdown/form-dropdown.component';
import { CONSTANTS } from '../../../constants/constants';
import { updateStudentStart, addStudentStart } from '../../../store/students/student.action';
import { selectStudents } from "../../../store/students/student.selector";
import { validateForm, getUpdatedErrorMsg } from '../../../utils/error-messages/error-messages.utils';

// const defaultErrorMessages = {
//     name: '',
//     email: '',
//     dob: '',
//     standard: '',
//     subject: '',
//     division: '',
//     rollNo: '',
// };
const defaultErrorMessages = {
    nameError: '',
    emailError: '',
    dobError: '',
    standardError: '',
    subjectError: '',
    divisionError: '',
    rollNoError: '',
};

const StudentForm = (props) => {

    let defaultFormFields = {
        name: '',
        email: '',
        dob: '',
        standard: '',
        subject: '',
        division: '',
        rollNo: '',
    };

    const dispatch = useDispatch();
    const students = useSelector(selectStudents);

    const { data, action, onHide } = props;
    defaultFormFields = action == CONSTANTS.ADD_ACTION ? defaultFormFields : data;

    // const [isSubmitted, setIsSubmitted] = useState(false);
    // const [isReset, setIsReset] = useState(false);

    // const [formFields, setFormFields] = useState(!!data.standard ? data : defaultFormFields);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, email, subject, standard, division, rollNo, dob } = formFields;

    //
    const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
    const { nameError, emailError, subjectError, standardError, divisionError, rollNoError, dobError } = errorMessages;

    // console.log(students);
    const resetFormFields = () => {
        setErrorMessages(defaultErrorMessages);
        setFormFields(defaultFormFields);

        // setIsReset(!isReset);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // setIsSubmitted(!isSubmitted);

        //Updating Error messages from FormComponent on FormSubmission
        const validationResult = validateForm(Object.keys(formFields), Object.values(formFields), Object.keys(defaultErrorMessages));

        if (!validationResult.isValid) {
            console.log('post validation ', validationResult.errors);
            setErrorMessages(validationResult.errors);
            return;
        }

        try {
            const actionToBe = action == CONSTANTS.ADD_ACTION ? addStudentStart(students, getFormData() ) : updateStudentStart(students, getFormData(), data );
            if (!actionToBe.conflicts) {
                dispatch(actionToBe);
                resetFormFields();
                onHide();
            } else {
                const updatedErrorMessages = { ...errorMessages };
                console.log('in conflict ', updatedErrorMessages);
                actionToBe.conflicts.forEach(error => {
                    console.log('in conflict ', error);
                    updatedErrorMessages[error.field] = error.message;
                });
                setErrorMessages(updatedErrorMessages);
            }

        } catch (error) {
            console.log('Student Registration encountered an error', error);
        }
    };

    const getFormData = () => {
        return {
            standard: standard,
            division: division,
            rollNo: rollNo,
            name: name,
            email: email,
            dob: dob,
            subject: subject,
        };
    }

    //Updating Error messages from FormComponent
    const onHandleBlur = (event, errorTag) => {
        const { name, value } = event.target;
        const errors = getUpdatedErrorMsg(errorTag, name, value, errorMessages);
        setErrorMessages(errors);
    };

    const handleChangeSelect = (event, name, errorTag) => {
        const { value } = event.target;
        setFormFields({ ...formFields, [name]: value });
        const errors = getUpdatedErrorMsg(errorTag, name, value, errorMessages);
        setErrorMessages(errors);
    };

    const onHandleBlurSelect = (event, name, errorTag) => {
        const { value } = event.target;
        if (value.length) {
            return;
        }
        handleChangeSelect(event, name, errorTag);
    };

    // const getUpdatedErrorMsg = (errorTag, fieldname, value) => {
    //     const updatedErrorMessages = { ...errorMessages };
    //     const errorMessagesKeys = Object.keys(updatedErrorMessages);
    //     const errorMessagesValues = Object.values(updatedErrorMessages);
    //     errorMessagesKeys.forEach((name, index) => {
    //         if (name == errorTag) {
    //             updatedErrorMessages[name] = validate(fieldname, value);
    //         } else {
    //             updatedErrorMessages[name] = errorMessagesValues[index];
    //         }
    //     });
    //     return updatedErrorMessages;
    // }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleFormAction = (msg) => {
        // setIsReset(false);
        // setIsSubmitted(false);
    };



    const subjectOptions = [
        { value: CONSTANTS.FAV_SUBJECT1, label: CONSTANTS.FAV_SUBJECT1 },
        { value: CONSTANTS.FAV_SUBJECT2, label: CONSTANTS.FAV_SUBJECT2 },
        { value: CONSTANTS.FAV_SUBJECT3, label: CONSTANTS.FAV_SUBJECT3 },
    ];
    const standardOptions = Array.from({ length: CONSTANTS.MAX_STANDARD }, (_, index) => ({
        value: `${index + 1}`,
        label: `${index + 1}`,
    }));

    const rollNoOptions = Array.from({ length: CONSTANTS.MAX_ROLLNO }, (_, index) => ({
        value: `${index + 1}`,
        label: `${index + 1}`,
    }));
    const divisionOptions = Array.from({ length: CONSTANTS.MAX_DIVISION }, (_, index) => ({
        value: String.fromCharCode(65 + index), // A: 65, B: 66, C: 67, D: 68
        label: String.fromCharCode(65 + index), // A: 65, B: 66, C: 67, D: 68
    }));


    return (
        <StudentFormContainer>
            <form onSubmit={handleSubmit}>
                <RowContainer>
                    <FormInput
                        label='Name'
                        type='text'
                        onChange={handleChange}
                        handleBlur={(event) => onHandleBlur(event, 'nameError')}
                        errorM={nameError}
                        name='name'
                        value={name}
                    // onHandleFormAction={handleFormAction}
                    // isSubmitted={isSubmitted}
                    // isReset={!isReset}
                    />

                </RowContainer>
                <RowContainer>
                    <FormInput
                        label='Email'
                        type='email'
                        onChange={handleChange}
                        handleBlur={(event) => onHandleBlur(event, 'emailError')}
                        errorM={emailError}
                        name='email'
                        value={email}
                    // onHandleFormAction={handleFormAction}
                    // isSubmitted={isSubmitted}
                    // isReset={!isReset}
                    />
                </RowContainer>
                <RowContainer>
                    <FormInput
                        label='Date of Birth'
                        type='date'
                        onChange={handleChange}
                        handleBlur={(event) => onHandleBlur(event, 'dobError')}
                        errorM={dobError}
                        name='dob'
                        value={dob}
                    // onHandleFormAction={handleFormAction}
                    // isSubmitted={isSubmitted}
                    // isReset={!isReset}
                    />
                </RowContainer>
                <RowContainer>
                    <DropdownInput
                        label='Standard'
                        options={standardOptions}
                        // handleChange={(event) => setFormFields({ ...formFields, standard: event.target.value })}
                        handleChange={(event, name) => handleChangeSelect(event, name, 'standardError')}
                        handleBlur={(event, name) => onHandleBlurSelect(event, name, 'standardError')}
                        errorM={standardError}
                        // selectedOption={standard}
                        value={standard}
                        name='standard'
                    // isSubmitted={isSubmitted}
                    // isReset={!isReset}

                    />
                    <DropdownInput
                        label='Division'
                        options={divisionOptions}
                        // handleChange={(event) => setFormFields({ ...formFields, division: event.target.value })}
                        handleChange={(event, name) => handleChangeSelect(event, name, 'divisionError')}
                        handleBlur={(event, name) => onHandleBlurSelect(event, name, 'divisionError')}
                        errorM={divisionError}
                        // selectedOption={division}
                        value={division}
                        name='division'
                    // isSubmitted={isSubmitted}
                    // isReset={!isReset}
                    />
                </RowContainer>

                <RowContainer>
                    <DropdownInput
                        label='Roll No.'
                        options={rollNoOptions}
                        // handleChange={(event) => setFormFields({ ...formFields, rollNo: event.target.value })}
                        handleChange={(event, name) => handleChangeSelect(event, name, 'rollNoError')}
                        handleBlur={(event, name) => onHandleBlurSelect(event, name, 'rollNoError')}
                        errorM={rollNoError}
                        // selectedOption={rollNo}
                        value={rollNo}
                        name='rollNo'
                    // isSubmitted={isSubmitted}
                    // isReset={!isReset}

                    />
                    <DropdownInput
                        label='Favourite Subject'
                        options={subjectOptions}
                        // handleChange={(event) => setFormFields({ ...formFields, subject: event.target.value })}
                        handleChange={(event, name) => handleChangeSelect(event, name, 'subjectError')}
                        handleBlur={(event, name) => onHandleBlurSelect(event, name, 'subjectError')}
                        errorM={subjectError}
                        // selectedOption={subject}
                        value={subject}
                        name='subject'
                    // isSubmitted={isSubmitted}
                    // isReset={!isReset}

                    />
                </RowContainer>

                <ButtonsContainer>
                    <Button type='submit'>{action == CONSTANTS.ADD_ACTION ? CONSTANTS.SUBMIT_BUTTON_TEXT : CONSTANTS.UPDATE_BUTTON_TEXT}</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type='button' onClick={resetFormFields} >{CONSTANTS.RESET_BUTTON_TEXT}</Button>
                </ButtonsContainer>
            </form>
        </StudentFormContainer >
    );
};

export default StudentForm;

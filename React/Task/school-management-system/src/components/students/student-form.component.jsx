import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';


import { ButtonsContainer, FormField, FormFieldContainer, StudentFormContainer, RowContainer, FormInputContainer } from './student-form.styles';
import { signUpStart } from '../../store/user/user.action';
import DropdownInput from '../form-dropdown/form-dropdown.component';
import { CONSTANTS } from '../../constants/constants';
import { fetchStudentsStart, updateStudentStart } from '../../store/students/student.action';
import { selectStudents, selectStudentsMap } from "../../store/students/student.selector";
import { validateForm, validate } from '../../utils/error-messages/error-messages.utils';

const defaultFormFields = {
    name: '',
    email: '',
    dob: '',
    standard: '',
    subject: '',
    division: '',
    rollNo: '',

};
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

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, email, subject, standard, division, rollNo, dob } = formFields;

    // const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
    // const { nameError, emailError, subjectError, standardError, divisionError, rollNoError, dobError } = errorMessages;

    const dispatch = useDispatch();
    const students = useSelector(selectStudents);
    console.log(students);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
        // setErrorMessages(defaultErrorMessages);

        setIsReset(!isReset);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(!isSubmitted);
        
        console.log('SetResponse ', setIsSubmitted(!isSubmitted));
        //Updating Error messages from FormComponent on FormSubmission
        const errors = validateForm(Object.keys(formFields), Object.values(formFields), Object.keys(defaultErrorMessages));
        console.log('OUTPUT ',errors);
        // setErrorMessages(errors);


        try {
            const action = updateStudentStart(students,
                {
                    standard: standard,
                    division: division,
                    rollNo: rollNo,
                    name: name,
                    email: email,
                    dob: dob,
                    subject: subject,

                }
            );
            if (action != null) {
                dispatch(action);
                resetFormFields();
            } else {
                console.log('null returned!');
            }


        } catch (error) {
            console.log('user creation encountered an error', error);
        }
    };

    ////Updating Error messages from FormComponent
    // const onHandleBlur = (event, errorTag) => {
    //     const { name, value } = event.target;
    //     const errors = getUpdatedErrorMsg(defaultErrorMessages, errorTag, name, value);
    //     setErrorMessages(errors);
    // };

    // const getUpdatedErrorMsg = (defaultErrorMessages, errorTag, fieldname, value) => {
    //     const updatedErrorMessages = { ...defaultErrorMessages };
    //     const errorMessagesKeys = Object.keys(defaultErrorMessages);
    //     const errorMessagesValues = Object.values(errorMessages);
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
        console.log('handle ',msg);
        setIsReset(false);
        setIsSubmitted(false);
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
                        onHandleFormAction={handleFormAction}
                        // handleBlur={(event) => onHandleBlur(event, 'nameError')}
                        // errorM={nameError}
                        name='name'
                        value={name}
                        isSubmitted={isSubmitted}
                        isReset={!isReset}
                    />

                </RowContainer>
                <RowContainer>
                    <FormInput
                        label='Email'
                        type='email'
                        onChange={handleChange}
                        onHandleFormAction={handleFormAction}
                        // handleBlur={(event) => onHandleBlur(event, 'emailError')}
                        // errorM={emailError}
                        name='email'
                        value={email}
                        isSubmitted={isSubmitted}
                        isReset={!isReset}
                    />
                </RowContainer>
                <RowContainer>
                    <FormInput
                        label='Date of Birth'
                        type='date'
                        onChange={handleChange}
                        onHandleFormAction={handleFormAction}
                        // handleBlur={(event) => onHandleBlur(event, 'dobError')}
                        // errorM={dobError}
                        name='dob'
                        value={dob}
                        isSubmitted={isSubmitted}
                        isReset={!isReset}
                    />
                </RowContainer>
                <RowContainer>
                    <DropdownInput
                        label='Standard'
                        options={standardOptions}
                        handleChange={(event) => setFormFields({ ...formFields, standard: event.target.value })}
                        // errorM={standardError}
                        selectedOption={standard}
                        name='standard'
                        isSubmitted={isSubmitted}
                        isReset={!isReset}

                    />
                    <DropdownInput
                        label='Division'
                        options={divisionOptions}
                        handleChange={(event) => setFormFields({ ...formFields, division: event.target.value })}
                        // errorM={divisionError}
                        selectedOption={division}
                        name='division'
                        isSubmitted={isSubmitted}
                        isReset={!isReset}
                    />
                </RowContainer>

                <RowContainer>
                    <DropdownInput
                        label='Roll No.'
                        options={rollNoOptions}
                        handleChange={(event) => setFormFields({ ...formFields, rollNo: event.target.value })}
                        // errorM={rollNoError}
                        selectedOption={rollNo}
                        name='rollNo'
                        isSubmitted={isSubmitted}
                        isReset={!isReset}

                    />
                    <DropdownInput
                        label='Favourite Subject'
                        options={subjectOptions}
                        handleChange={(event) => setFormFields({ ...formFields, subject: event.target.value })}
                        // errorM={subjectError}
                        selectedOption={subject}
                        name='subject'
                        isSubmitted={isSubmitted}
                        isReset={!isReset}

                    />
                </RowContainer>

                <ButtonsContainer>
                    <Button type='submit'>Submit</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type='button' onClick={resetFormFields} >Reset</Button>
                </ButtonsContainer>
            </form>
        </StudentFormContainer >
    );
};

export default StudentForm;

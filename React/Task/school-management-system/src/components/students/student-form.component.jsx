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
import { validateForm } from '../../utils/error-messages/error-messages.utils';

const defaultFormFields = {
    name: '',
    email: '',
    dob: '',
    standard: '',
    subject: '',
    division: '',
    rollNo: '',

};
const defaultErrorMessages = {
    name: '',
    email: '',
    dob: '',
    standard: '',
    subject: '',
    division: '',
    rollNo: '',

};

const StudentForm = (props) => {
    const { onHide } = props;
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);

    console.log('DEF ERRORMESSAGE ', defaultErrorMessages);
    console.log('setDEF ERRORMESSAGE ', errorMessages);
    const { name, email, subject, standard, division, rollNo, dob } = formFields;
    const dispatch = useDispatch();
    const students = useSelector(selectStudents);

    const resetFormFields = () => {
        // setFormFields(defaultFormFields);
    };

    // useEffect(() => {
    //     setFormFields(formFields);
    //   }, [errorMessages]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errorMessages = validateForm(Object.keys(formFields), Object.values(formFields), defaultErrorMessages);
        console.log('ERRORMESSAGE ', errorMessages);
        console.log('ERRORMESSAGE ', errorMessages.name);
        setErrorMessages(errorMessages);
        setFormFields(formFields);

        try {
            const action = updateStudentStart(students,
                {
                    standard: standard,
                    division: division,
                    rollNo: rollNo,
                    name: name,
                    email: email,
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
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
    console.log(divisionOptions);



    return (
        <StudentFormContainer>

            <form onSubmit={handleSubmit}>
                <RowContainer>
                    <FormInput
                        label='Name'
                        type='text'
                        onChange={handleChange}
                        name='name'
                        value={name}
                        error={errorMessages.name}
                    />

                </RowContainer>
                <RowContainer>
                    <FormInput
                        label='Email'
                        type='email'
                        onChange={handleChange}
                        name='email'
                        value={email}
                    />
                </RowContainer>
                <RowContainer>
                    <FormInput
                        label='Date of Birth'
                        type='date'
                        onChange={handleChange}
                        name='dob'
                        value={dob}
                    />
                </RowContainer>
                <RowContainer>
                    <DropdownInput
                        label='Standard'
                        options={standardOptions}
                        handleChange={(event) => setFormFields({ ...formFields, standard: event.target.value })}
                        selectedOption={standard}
                        name='standard'
                    />
                    <DropdownInput
                        label='Division'
                        options={divisionOptions}
                        handleChange={(event) => setFormFields({ ...formFields, division: event.target.value })}
                        selectedOption={division}
                        name='division'
                    />
                </RowContainer>

                <RowContainer>
                    <DropdownInput
                        label='Roll No.'
                        options={rollNoOptions}
                        handleChange={(event) => setFormFields({ ...formFields, rollNo: event.target.value })}
                        selectedOption={rollNo}
                        name='rollNo'
                    />
                    <DropdownInput
                        label='Favourite Subject'
                        options={subjectOptions}
                        handleChange={(event) => setFormFields({ ...formFields, subject: event.target.value })}
                        selectedOption={subject}
                        name='subject'
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

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';


import { ButtonsContainer, FormField, FormFieldContainer, StudentFormContainer, RowContainer, FormInputContainer } from './student-form.styles';
import { signUpStart } from '../../store/user/user.action';
import DropdownInput from '../form-dropdown/form-dropdown.component';
import { CONSTANTS } from '../../constants/constants';


const defaultFormFields = {
    displayName: '',
    email: '',
    dob: '',
    standard: '',
    subject: '',

};

const StudentForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, subject, standard, dob } = formFields;
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
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



    return (
        <StudentFormContainer>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Name'
                    type='text'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />

                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <RowContainer>
                    <FormInputContainer>
                        <FormInput
                            label='Name'
                            type='text'
                            required
                            onChange={handleChange}
                            name='displayName'
                            value={displayName}
                        />
                    </FormInputContainer>
                    <FormInputContainer>
                        <FormInput
                            label='Email'
                            type='email'
                            required
                            onChange={handleChange}
                            name='email'
                            value={email}
                        />
                    </FormInputContainer>
                </RowContainer>

                <FormFieldContainer>
                    <FormField>
                        <DropdownInput
                            label='Favourite Subject'
                            options={subjectOptions}
                            handleChange={(event) => setFormFields({ ...formFields, subject: event.target.value })}
                            selectedOption={subject}
                            name='dropdown'
                        />
                    </FormField>
                    <FormField>
                        <DropdownInput
                            label='Standard'
                            options={standardOptions}
                            handleChange={(event) => setFormFields({ ...formFields, standard: event.target.value })}
                            selectedOption={standard}
                            name='dropdown'
                        />
                    </FormField>
                </FormFieldContainer>


                <FormInput
                    label='Date of Birth'
                    type='date'
                    onChange={handleChange}
                    name='dob'
                    value={dob}
                />
                <ButtonsContainer>
                    <Button type='submit'>Submit</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type='button' onClick={resetFormFields} >Reset</Button>
                </ButtonsContainer>
            </form>
        </StudentFormContainer >
    );
};

export default StudentForm;

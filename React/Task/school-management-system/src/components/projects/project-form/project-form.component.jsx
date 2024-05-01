import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormInput from '../../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../../button/button.component';


import { ButtonsContainer, StudentFormContainer, RowContainer } from '../../students/student-form/student-form.styles';
import DropdownInput from '../../form-dropdown/form-dropdown.component';
import { CONSTANTS } from '../../../constants/constants';
import { updateStudentStart, addStudentStart } from '../../../store/students/student.action';
import { selectStudents } from "../../../store/students/student.selector";
import { validateForm, getUpdatedErrorMsg } from '../../../utils/error-messages/error-messages.utils';
import { addProjectStart } from '../../../store/projects/project.action';


const defaultErrorMessages = {
    titleError: '',
    descriptionError: '',
    startDateError: '',
    endDateError: '',
    statusError: '',
    nameError: '',
    emailError: '',

};

const ProjectForm = (props) => {

    let defaultFormFields = {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: '',
        name: '',
        email: '',
    };

    const dispatch = useDispatch();
    const students = useSelector(selectStudents);

    const { data, action, onHide } = props;
    defaultFormFields = action == CONSTANTS.ADD_ACTION ? defaultFormFields : data;

    const [formFields, setFormFields] = useState(defaultFormFields);

    const { title, description, startDate, endDate, status, name, email } = formFields;

    //
    const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
    const { titleError, descriptionError, startDateError, endDateError, statusError, nameError, emailError } = errorMessages;

    const flattenedStudents = students.flatMap(({ standard, divisions }) => {
        return divisions.flatMap(({ division, students }) => {
            return students.map(({ dob, email, name, rollNo, subject }) => {
                return { dob, email, name, rollNo, subject, standard, division };
            });
        });
    });

    const resetFormFields = () => {
        setErrorMessages(defaultErrorMessages);
        setFormFields(defaultFormFields);

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        //Updating Error messages from FormComponent on FormSubmission
        const validationResult = validateForm(Object.keys(formFields), Object.values(formFields), Object.keys(defaultErrorMessages));

        if (!validationResult.isValid) {
            console.log('post validation ', validationResult.errors);
            setErrorMessages(validationResult.errors);
            return;
        }

        try {
            const actionToBe = action == CONSTANTS.ADD_ACTION ? addProjectStart(students, getFormData(), flattenedStudents) : updateStudentStart(students, getFormData(), data, flattenedStudents);
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
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            status: status,
            name: name,
            email: email,
            
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

  

    console.log('PROJECT ', flattenedStudents);
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
                        label='Title'
                        type='text'
                        onChange={handleChange}
                        handleBlur={(event) => onHandleBlur(event, 'titleError')}
                        errorM={titleError}
                        name='title'
                        value={title}
                    />
                </RowContainer>
                <RowContainer>
                    <FormInput
                        label='Status'
                        type='text'
                        onChange={handleChange}
                        handleBlur={(event) => onHandleBlur(event, 'statusError')}
                        errorM={statusError}
                        name='status'
                        value={status}
                    />
                </RowContainer>
                <RowContainer>
                    <FormInput
                        label='Description'
                        type='text'
                        onChange={handleChange}
                        handleBlur={(event) => onHandleBlur(event, 'descriptionError')}
                        errorM={descriptionError}
                        name='description'
                        value={description}
                    />
                </RowContainer>
                <RowContainer>
                    <FormInput
                        label='Name'
                        type='text'
                        onChange={handleChange}
                        handleBlur={(event) => onHandleBlur(event, 'nameError')}
                        errorM={nameError}
                        name='name'
                        value={name}
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
                    />
                </RowContainer>
                <RowContainer>
                    <FormInput
                        label='Start Date'
                        type='date'
                        onChange={handleChange}
                        handleBlur={(event) => onHandleBlur(event, 'startDateError')}
                        errorM={startDateError}
                        name='startDate'
                        value={startDate}
                    />
                </RowContainer>
                <RowContainer>
                    <FormInput
                        label='End Date'
                        type='date'
                        onChange={handleChange}
                        handleBlur={(event) => onHandleBlur(event, 'endDateError')}
                        errorM={endDateError}
                        name='endDate'
                        value={endDate}
                    />
                </RowContainer>
                {/* <RowContainer>
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
                </RowContainer> */}

                <ButtonsContainer>
                    <Button type='submit'>{action == CONSTANTS.ADD_ACTION ? CONSTANTS.SUBMIT_BUTTON_TEXT : CONSTANTS.UPDATE_BUTTON_TEXT}</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type='button' onClick={resetFormFields} >{CONSTANTS.RESET_BUTTON_TEXT}</Button>
                </ButtonsContainer>
            </form>
        </StudentFormContainer >
    );
};

export default ProjectForm;

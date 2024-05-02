import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormInput from '../../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../../button/button.component';

import DropdownInput from '../../form-dropdown/form-dropdown.component';
import { CONSTANTS } from '../../../constants/constants';
import { selectStudents } from "../../../store/students/student.selector";
import { validateForm, getUpdatedErrorMsg } from '../../../utils/validation/validation.utils';
import { addProjectStart, isStudentWithEmailAndName, updateProjectStart } from '../../../store/projects/project.action';
import { selectProjects } from '../../../store/projects/project.selector';
import { ButtonsContainer, ProjectFormContainer, RowContainer } from './project-form.styles';
import FormTextArea from '../../form-text-area/form-text-area.component';


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

    const { data, action, onHide } = props;

    let defaultFormFields = {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: '',
        name: '',
        email: '',
        emailOptions: [],
        nameOptions: []
    };

    const dispatch = useDispatch();
    const students = useSelector(selectStudents);
    const projects = useSelector(selectProjects);

    const flattenedStudents = students.flatMap(({ standard, divisions }) => {
        return divisions.flatMap(({ division, students }) => {
            return students.map(({ dob, email, name, rollNo, subject }) => {
                return { dob, email, name, rollNo, subject, standard, division };
            });
        });
    });
    const getEmails = (studentEmail) => {
        return [...studentEmail, ...[...new Set(flattenedStudents.map(student => student.email))].map(email => (getSelectValueAndLabel(email)))];
    }
    const getNames = (studentName) => {
        return [...studentName, ...[...new Set(flattenedStudents.map(student => student.name))].map(name => (getSelectValueAndLabel(name)))];
    }
    const getSelectValueAndLabel = (field) => {
        return {
            value: field,
            label: field
        }
    }
    const isStudent = action === CONSTANTS.ADD_ACTION ? true : isStudentWithEmailAndName(flattenedStudents, data.email, data.name);

    let emailOpt = getEmails(isStudent ? [] : [getSelectValueAndLabel(data.email)]);
    let nameOpt = getNames(isStudent ? [] : [getSelectValueAndLabel(data.name)]);

    const getFormFieldsWithEmailAndNameOptions = (fields) => {
        return { ...fields, emailOptions: emailOpt, nameOptions: nameOpt };
    }

    defaultFormFields = action === CONSTANTS.ADD_ACTION ? getFormFieldsWithEmailAndNameOptions(defaultFormFields) : getFormFieldsWithEmailAndNameOptions(data);

    const [formFields, setFormFields] = useState(defaultFormFields);


    const { title, description, startDate, endDate, status, name, email, emailOptions, nameOptions } = formFields;

    const getValidEmailMessage = (emailToBeChecked) => {
        if (emailToBeChecked === data.email)
            return 'Student not found!';
        else return '';
    }
    const getValidNameMessage = (nameToBeChecked) => {
        if (nameToBeChecked === data.name)
            return 'Student not found!';
        else return '';

    }

    const [errorMessages, setErrorMessages] = useState(isStudent ? defaultErrorMessages : { ...defaultErrorMessages, emailError: getValidEmailMessage(email), nameError: getValidNameMessage(name) });

    const { titleError, descriptionError, startDateError, endDateError, statusError, nameError, emailError } = errorMessages;

    const statusOptions = [
        { value: CONSTANTS.PROJECT_ONGOING_STATUS, label: CONSTANTS.PROJECT_ONGOING_STATUS },
        { value: CONSTANTS.PROJECT_HOLD_STATUS, label: CONSTANTS.PROJECT_HOLD_STATUS },
        { value: CONSTANTS.PROJECT_COMPLETE_STATUS, label: CONSTANTS.PROJECT_COMPLETE_STATUS }
    ];
    // const statusOptions = CONSTANTS.PROJECT_STATUS_OPTIONS;


    const resetFormFields = () => {
        setErrorMessages(isStudent ? defaultErrorMessages : { ...defaultErrorMessages, emailError: getValidEmailMessage(data.email), nameError: getValidNameMessage(data.name) });
        setFormFields(defaultFormFields);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        //Updating Error messages from FormComponent on FormSubmission
        const validationResult = validateForm(Object.keys(formFields), Object.values(formFields), Object.keys(defaultErrorMessages));

        if (!validationResult.isValid) {
            setErrorMessages(validationResult.errors);
            return;
        }

        try {
            const actionToBe = (action == CONSTANTS.ADD_ACTION)
                ? addProjectStart(projects, getFormData(), flattenedStudents)
                : updateProjectStart(projects, getFormData(), data, flattenedStudents);
            if (!actionToBe.conflicts) {
                dispatch(actionToBe);
                resetFormFields();
                onHide();
            } else {
                const updatedErrorMessages = { ...errorMessages };
                actionToBe.conflicts.forEach(error => {
                    updatedErrorMessages[error.field] = error.message;
                });
                setErrorMessages(updatedErrorMessages);
            }

        } catch (error) {
            console.log(`Project ${action === CONSTANTS.ADD_ACTION ? 'Registration' : 'Updation'} encountered an error`, error);
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
        if ((errorTag === CONSTANTS.START_DATE_ERROR_TAG) && !errors[errorTag] && isValidStartDateEndDateRelation(value, endDate))
            errors[errorTag] = CONSTANTS.INVALID_START_DATE_RELATION;

        if ((errorTag === CONSTANTS.END_DATE_ERROR_TAG) && !errors[errorTag] && isValidStartDateEndDateRelation(startDate, value))
            errors[errorTag] = CONSTANTS.INVALID_END_DATE_RELATION;

        setErrorMessages(errors);
    };

    const isValidStartDateEndDateRelation = (isValue, compareValue) => {
        return new Date(isValue) > new Date(compareValue);
    }

    const getNamesForSelectedEmail = (value) => {
        let studentName = [];
        if (!isStudent && value === data.email) {
            return studentName = [getSelectValueAndLabel(data.name)];
        }
        return [...studentName, ...[...new Set(flattenedStudents.map(student => { return student.email === value ? student.name : '' }))].map(name => {
            if (!!name) {
                return getSelectValueAndLabel(name);
            }
            return null;
        }).filter(option => option !== null)];
    }

    const handleChangeSelect = (event, name, errorTag) => {
        const { value } = event.target;
        if (name === 'email') {
            nameOpt = getNamesForSelectedEmail(value);
            setFormFields({ ...formFields, [name]: value, 'name': nameOpt[0].value, 'nameOptions': nameOpt });
            const errors = getUpdatedErrorMsg(errorTag, name, value, errorMessages);
            setErrorMessages({ ...errors, emailError: getValidEmailMessage(value), nameError: getValidNameMessage(nameOpt[0].value) });
        } else if (name === 'name') {
            setFormFields({ ...formFields, [name]: value });
            const errors = getUpdatedErrorMsg(errorTag, name, value, errorMessages);
            setErrorMessages({ ...errors, nameError: getValidNameMessage(value) });
        }
        else {
            setFormFields({ ...formFields, [name]: value });
            const errors = getUpdatedErrorMsg(errorTag, name, value, errorMessages);
            setErrorMessages(errors);
        }
    };

    const onHandleBlurSelect = (event, name, errorTag) => {
        const { value } = event.target;
        if (!value.length || (name === 'email' && value === data.email)) {
            return;
        }
        handleChangeSelect(event, name, errorTag);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };


    return (
        <ProjectFormContainer>
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
                    <FormTextArea
                        label='Description'
                        type='text'
                        onChange={handleChange}
                        handleBlur={(event) => onHandleBlur(event, CONSTANTS.DESCRIPTION_ERROR_TAG)}
                        errorM={descriptionError}
                        name='description'
                        value={description}
                    />
                </RowContainer>

                <RowContainer>
                    <FormInput
                        label='Start Date'
                        type='date'
                        onChange={handleChange}
                        handleBlur={(event) => onHandleBlur(event, CONSTANTS.START_DATE_ERROR_TAG)}
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
                        handleBlur={(event) => onHandleBlur(event, CONSTANTS.END_DATE_ERROR_TAG)}
                        errorM={endDateError}
                        name='endDate'
                        value={endDate}
                    />
                </RowContainer>
                <RowContainer>
                    <DropdownInput
                        label='Status'
                        options={statusOptions}
                        // handleChange={(event) => setFormFields({ ...formFields, standard: event.target.value })}
                        handleChange={(event, name) => handleChangeSelect(event, name, CONSTANTS.STATUS_ERROR_TAG)}
                        handleBlur={(event, name) => onHandleBlurSelect(event, name, CONSTANTS.STATUS_ERROR_TAG)}
                        errorM={statusError}
                        // selectedOption={standard}
                        value={status}
                        name='status'
                    />
                </RowContainer>
                <RowContainer>
                    <DropdownInput
                        label='Student Email'
                        options={emailOptions}
                        // handleChange={(event) => setFormFields({ ...formFields, standard: event.target.value })}
                        handleChange={(event, name) => handleChangeSelect(event, name, CONSTANTS.EMAIL_ERROR_TAG)}
                        handleBlur={(event, name) => onHandleBlurSelect(event, name, CONSTANTS.EMAIL_ERROR_TAG)}
                        errorM={emailError}
                        // selectedOption={standard}
                        value={email}
                        name='email'
                    />
                    <DropdownInput
                        label='Student Name'
                        options={nameOptions}
                        // handleChange={(event) => setFormFields({ ...formFields, division: event.target.value })}
                        handleChange={(event, name) => handleChangeSelect(event, name, CONSTANTS.NAME_ERROR_TAG)}
                        handleBlur={(event, name) => onHandleBlurSelect(event, name, CONSTANTS.NAME_ERROR_TAG)}
                        errorM={nameError}
                        // selectedOption={division}
                        value={name}
                        name='name'
                    />
                </RowContainer>


                <ButtonsContainer>
                    <Button type='submit'>{action == CONSTANTS.ADD_ACTION ? CONSTANTS.SUBMIT_BUTTON_TEXT : CONSTANTS.UPDATE_BUTTON_TEXT}</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type='button' onClick={resetFormFields} >{CONSTANTS.RESET_BUTTON_TEXT}</Button>
                </ButtonsContainer>
            </form>
        </ProjectFormContainer >
    );
};

export default ProjectForm;

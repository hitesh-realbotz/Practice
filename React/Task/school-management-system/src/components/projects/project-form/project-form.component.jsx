import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormInput from '../../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../../button/button.component';

import DropdownInput from '../../form-dropdown/form-dropdown.component';
import { CONSTANTS } from '../../../constants/constants';
import { selectStudents } from "../../../store/students/student.selector";
import { validateForm, getUpdatedErrorMsg } from '../../../utils/error-messages/error-messages.utils';
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
    console.log('FORM Data ', data);

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
    const projects = useSelector(selectProjects);

    const flattenedStudents = students.flatMap(({ standard, divisions }) => {
        return divisions.flatMap(({ division, students }) => {
            return students.map(({ dob, email, name, rollNo, subject }) => {
                return { dob, email, name, rollNo, subject, standard, division };
            });
        });
    });
    const getEmails = (studentEmail) => {
        console.log('FORM studentEmail ', studentEmail);
        console.log('FORM studentEmail ', studentEmail);
        return [ ...studentEmail, ...[...new Set(flattenedStudents.map(student => student.email))].map(email => (getSelectValueAndLabel(email)))];
    }
    const getNames = (studentName) => {
        console.log('FORM studentName ', studentName);
        return [ ...studentName, ...[...new Set(flattenedStudents.map(student => student.name))].map(name => (getSelectValueAndLabel(name)))];
    }
    const getSelectValueAndLabel = (field) => {
        return {
            value: field,
            label: field
        }
    }
    const isStudent = isStudentWithEmailAndName(flattenedStudents, data.email, data.name);
   
    console.log('FORM isStudent ', isStudent);
    const [emailOptions, setEmailOptions] = useState(getEmails(isStudent ? [] : [getSelectValueAndLabel(data.email)]));
    const [nameOptions, setNameOptions] = useState(getNames(isStudent ? [] : [getSelectValueAndLabel(data.name)]));


    defaultFormFields = action == CONSTANTS.ADD_ACTION ? defaultFormFields : data;

    const [formFields, setFormFields] = useState(defaultFormFields);


    const { title, description, startDate, endDate, status, name, email } = formFields;

    //
    const [errorMessages, setErrorMessages] = useState( isStudent ? defaultErrorMessages : { ...defaultErrorMessages, emailError: 'Studentnot found!', nameError: 'Student not found!' });
    const { titleError, descriptionError, startDateError, endDateError, statusError, nameError, emailError } = errorMessages;


    console.log('PROJECT ', flattenedStudents);
    
    const statusOptions = [
        { value: CONSTANTS.PROJECT_ONGOING_STATUS, label: CONSTANTS.PROJECT_ONGOING_STATUS },
        { value: CONSTANTS.PROJECT_HOLD_STATUS, label: CONSTANTS.PROJECT_HOLD_STATUS },
        { value: CONSTANTS.PROJECT_COMPLETE_STATUS, label: CONSTANTS.PROJECT_COMPLETE_STATUS }
    ];
    // const statusOptions = CONSTANTS.PROJECT_STATUS_OPTIONS;


    const resetFormFields = () => {
        setErrorMessages(defaultErrorMessages);
        setFormFields(defaultFormFields);
        setEmailOptions(getEmails(isStudent ? [] : [getSelectValueAndLabel(data.email)]));
        setNameOptions(getNames(isStudent ? [] : [getSelectValueAndLabel(data.name)]));
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
            const actionToBe = (action == CONSTANTS.ADD_ACTION)
                ? addProjectStart(projects, getFormData(), flattenedStudents)
                : updateProjectStart(projects, getFormData(), data, flattenedStudents);
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
            console.log('Project Registration encountered an error', error);
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
        if ((errorTag === 'startDateError') && !errors[errorTag] && isValidStartEndDateRelation(value, endDate)) {
            errors[errorTag] = "Start date should not be greater than end date";
        }
        if ((errorTag === 'endDateError') && !errors[errorTag] && isValidStartEndDateRelation(startDate, value)) {
            errors[errorTag] = "End date should not be less than start date";
        }
    };

    const isValidStartEndDateRelation = (isValue, compareValue) => {
        console.log(isValue, compareValue);
        console.log(new Date(isValue) > new Date(compareValue));
        return new Date(isValue) > new Date(compareValue);
    }

    const handleChangeSelect = (event, name, errorTag) => {
        const { value } = event.target;
        if (name === 'email') {
            let nameOp = [...new Set(flattenedStudents.map(student => { return student.email === value ? student.name : '' }))].map(name => {
                if (!!name) {
                    return {
                        value: name,
                        label: name
                    }
                }
                return null;
            }).filter(option => option !== null);

            console.log('FORM nameOp before ', nameOp);
            nameOp = [...(isStudent ? nameOp : nameOptions) ];
            console.log('FORM nameOp after ', nameOp);

            setFormFields({ ...formFields, [name]: value, 'name': nameOp[0].value });
            setNameOptions(nameOp);
        } else {
            setFormFields({ ...formFields, [name]: value});
        }
        const errors = getUpdatedErrorMsg(errorTag, name, value, errorMessages);
       
        console.log('SELECT ', name, errorTag);
        setErrorMessages(errors);
        // if (name === 'email' && !errors[errorTag]) {
        //     console.log('SELECT ', emailOptions, nameOptions);
        //     setNameOptions([...new Set(flattenedStudents.map(student => { return student.email === value ? student.name : '' }))].map(name => {
        //         console.log(!!name);
        //         if (!!name) {
        //             return {
        //                 value: name,
        //                 label: name
        //             }
        //         }
        //         return null;
        //     }).filter(option => option !== null));

        //     setFormFields({ ...formFields, 'name': nameOptions[0].value });
        //     console.log('SELECT  in condition', nameOptions,  nameOptions[0].value);
        // }

        // if (name === 'name' && !errors[errorTag]) {
        //     setEmailOptions([...new Set(flattenedStudents.map(student => { return student.name === value ? student.email : '' }))].map(email => {
        //         console.log(!!email);
        //         if (!!email) {
        //             return {
        //                 value: email,
        //                 label: email
        //             }
        //         }
        //         return null;
        //     }).filter(option => option !== null))
        //     console.log('SELECT  in condition', emailOptions);
        // }
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

    const getUpdatedDropDownValues = () => {

    }


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

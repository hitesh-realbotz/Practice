import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import React, { useState, useEffect } from 'react';
import FormModal from "../modal/form-modal.component";
import { CONSTANTS } from "../../constants/constants.js";
import { useDispatch, useSelector } from 'react-redux';
import { selectFlatenedStudents, selectIsLoading, selectStudents } from "../../store/students/student.selector";
import ConfirmModal from "../modal/confirm-modal.component";
import { deleteStudentStart, fetchStudentsStart } from "../../store/students/student.action";
import { ButtonsContainer, StudentsTab } from "./students.styles";
import TableComponent from "../table/table.component";
import Spinner from "../spinner/spinner.component";
import { selectProjects } from "../../store/projects/project.selector";
import { deleteProjectStart } from "../../store/projects/project.action";
import Sort from "../sort/sort.component";

// import 'react-toastify/dist/ReactToastify.css';


const defaultModalProps = {
    action: CONSTANTS.ADD_ACTION,
    show: false,
    form: CONSTANTS.FOR_STUDENT,
    data: {}
}
const Students = () => {

    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const projects = useSelector(selectProjects);
    const [modalProps, setModalProps] = useState(defaultModalProps);
    const students = useSelector(selectFlatenedStudents);
    const nestedStudents = useSelector(selectStudents);

    useEffect(() => {
        dispatch(fetchStudentsStart());
    }, []);

    const handleAddStudentFormModal = () => {
        const updatedModelProps = { ...modalProps };
        updatedModelProps.action = CONSTANTS.ADD_ACTION;
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
    }

    const handleEditStudent = (student) => {
        const project = getProjectWithEmail(student.email);
        const updatedModelProps = { ...modalProps };
        updatedModelProps.action = CONSTANTS.EDIT_ACTION;
        // updatedModelProps.data = student;
        updatedModelProps.data = { student: student, projects: projects };
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
    }

    const handleHideModal = () => {
        setModalProps(defaultModalProps);
    }

    const getProjectWithEmail = (email) => {
        return projects.filter(p => p.email === email);
    }


    const handleDeleteStudent = (student) => {
        const project = getProjectWithEmail(student.email);
        const updatedModelProps = { ...modalProps };
        updatedModelProps.action = CONSTANTS.DELETE_ACTION;
        updatedModelProps.data = { student: student, projects: projects, project: getProjectWithEmail(student.email) };
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
    }

    const handleConfirm = () => {
        try {
            
            dispatch(deleteStudentStart(nestedStudents, modalProps.data));

        } catch (error) {
            console.log('Student Deletion encountered an error', error);
        }
        setModalProps(defaultModalProps);
    }

    const defaultSortFields = {
        sortBy: CONSTANTS.SORT_BY_STANDARD,
        sortOrder: CONSTANTS.SORT_ORDER_ASC,
        sortOptions: [
            { value: CONSTANTS.SORT_BY_STANDARD, label: CONSTANTS.SORT_BY_STANDARD_LABEL },
            { value: CONSTANTS.SORT_BY_EMAIL, label: CONSTANTS.SORT_BY_EMAIL_LABEL },
            { value: CONSTANTS.SORT_BY_NAME, label: CONSTANTS.SORT_BY_NAME_LABEL },
            { value: CONSTANTS.SORT_BY_DOB, label: CONSTANTS.SORT_BY_DOB_LABEL },
            { value: CONSTANTS.SORT_BY_DIVISION, label: CONSTANTS.SORT_BY_DIVISION_LABEL },
            { value: CONSTANTS.SORT_BY_SUBJECT, label: CONSTANTS.SORT_BY_SUBJECT_LABEL },
        ],
        sortOrderOptions: [
            { value: CONSTANTS.SORT_ORDER_ASC, label: CONSTANTS.SORT_ORDER_ASC },
            { value: CONSTANTS.SORT_ORDER_DESC, label: CONSTANTS.SORT_ORDER_DESC },
        ]
    }
    const [sortFields, setSortFields] = useState(defaultSortFields);
    const { sortBy, sortOrder, sortOptions, sortOrderOptions } = sortFields;

    const handleChangeSelect = (event, name) => {
        const { value } = event.target;
        console.log('CHANGE ', name, value);
        setSortFields({ ...sortFields, [name]: value });
    };
    const onHandleBlurSelect = (event, name) => {
        const { value } = event.target;
        if (value.length && value !== sortFields[name]) {
            handleChangeSelect(event, name);
            return;
        }
        return;
    };


    return (
        <> {
            isLoading ?
                <>
                    < Spinner />
                </>
                :
                <StudentsTab>
                    <>
                        {
                            modalProps.action === CONSTANTS.DELETE_ACTION ? <ConfirmModal action={modalProps.action} show={modalProps.show} form={modalProps.form} data={modalProps.data} onHide={handleHideModal} onConfirm={handleConfirm} /> : <FormModal action={modalProps.action} show={modalProps.show} form={modalProps.form} data={modalProps.data} onHide={handleHideModal} />
                        }

                        {
                            !!students && !!students.length
                                ?
                                <>
                                    <Sort
                                        sortOptions={sortOptions}
                                        sortOrderOptions={sortOrderOptions}
                                        sortBy={sortBy}
                                        sortOrder={sortOrder}
                                        onhandleChange={(event, name) => handleChangeSelect(event, name, CONSTANTS.STANDARD_ERROR_TAG)}
                                        onhandleBlur={(event, name) => onHandleBlurSelect(event, name, CONSTANTS.STANDARD_ERROR_TAG)}
                                        handleAdd={handleAddStudentFormModal}
                                        handleReset={() => setSortFields(defaultSortFields)}
                                        sortFor={CONSTANTS.FOR_STUDENT}>

                                    </Sort>

                                    {/* {
                                    modalProps.action === CONSTANTS.DELETE_ACTION ? <ConfirmModal action={modalProps.action} show={modalProps.show} form={modalProps.form} data={modalProps.data} onHide={handleHideModal} onConfirm={handleConfirm} /> : <FormModal action={modalProps.action} show={modalProps.show} form={modalProps.form} data={modalProps.data} onHide={handleHideModal} />
                                } */}

                                    <div>
                                        {
                                            !!students && !!students.length ?
                                                <TableComponent
                                                    tableFor={CONSTANTS.FOR_STUDENT}
                                                    tableData={students}
                                                    handleEdit={(student) => handleEditStudent(student)}
                                                    handleDelete={(student) => handleDeleteStudent(student)}
                                                    sortByProp={sortBy}
                                                    sortOrderProp={sortOrder} />
                                                : <p>No students data available.</p>
                                        }

                                    </div>
                                </>
                                :
                                <>
                                    <ButtonsContainer>
                                        <p>No students data available.</p>
                                        <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={handleAddStudentFormModal}>Add Student</Button>
                                    </ButtonsContainer>
                                </>
                        }

                    </>
                </StudentsTab>
        }
        </>
    );
}

export default Students;
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import React, { useState, useEffect } from 'react';
import FormModal from "../modal/form-modal.component";
import { CONSTANTS } from "../../constants/constants.js";
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectProjects } from "../../store/projects/project.selector";
import { ButtonsContainer, ProjectsTab } from "./projects.styles";
import { selectCurrentUser } from "../../store/user/user.selector";
import ConfirmModal from "../modal/confirm-modal.component";
import TableComponent from "../table/table.component";
import { deleteProjectStart, fetchProjectsStart } from "../../store/projects/project.action";
import Spinner from "../spinner/spinner.component";
import Sort from "../sort/sort.component";

const defaultModalProps = {
    action: CONSTANTS.ADD_ACTION,
    show: false,
    form: CONSTANTS.FOR_PROJECT,
    data: {}
}

const Projects = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        let a = currentUser ? dispatch(fetchProjectsStart()) : '';
    }, []);

    const [modalProps, setModalProps] = useState(defaultModalProps);
    const projects = useSelector(selectProjects);

    const handleAddProjectFormModal = () => {
        const updatedModelProps = { ...modalProps };
        updatedModelProps.action = CONSTANTS.ADD_ACTION;
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
    }



    const handleHideModal = () => {
        setModalProps(defaultModalProps);
    }
    const handleConfirm = () => {
        try {
            dispatch(deleteProjectStart(projects, modalProps.data));
        } catch (error) {
            console.log('Project Deletion encountered an error', error);
        }
        setModalProps(defaultModalProps);
    }

    const handleEditProject = (project) => {
        const updatedModelProps = { ...modalProps };
        updatedModelProps.action = CONSTANTS.EDIT_ACTION;
        updatedModelProps.data = project;
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
    }

    const handleDeleteProject = (project) => {
        const updatedModelProps = { ...modalProps };
        updatedModelProps.action = CONSTANTS.DELETE_ACTION;
        updatedModelProps.data = project;
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
    }

    const defaultSortFields = {
        sortBy: CONSTANTS.SORT_BY_TITLE,
        sortOrder: CONSTANTS.SORT_ORDER_ASC,
        sortOptions: [
            { value: CONSTANTS.SORT_BY_TITLE, label: CONSTANTS.SORT_BY_TITLE_LABEL },
            { value: CONSTANTS.SORT_BY_STATUS, label: CONSTANTS.SORT_BY_STATUS_LABEL },
            { value: CONSTANTS.SORT_BY_NAME, label: CONSTANTS.SORT_BY_NAME_LABEL },
            { value: CONSTANTS.SORT_BY_START_DATE, label: CONSTANTS.SORT_BY_START_DATE_LABEL },
            { value: CONSTANTS.SORT_BY_END_DATE, label: CONSTANTS.SORT_BY_END_DATE_LABEL },
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
                <ProjectsTab>
                    <>
                        {
                            modalProps.action === CONSTANTS.DELETE_ACTION ? <ConfirmModal action={modalProps.action} show={modalProps.show} form={modalProps.form} data={modalProps.data} onHide={handleHideModal} onConfirm={handleConfirm} /> : <FormModal action={modalProps.action} show={modalProps.show} form={modalProps.form} data={modalProps.data} onHide={handleHideModal} />
                        }

                        {
                            !!projects && !!projects.length
                                ?
                                <>
                                    <Sort
                                        sortOptions={sortOptions}
                                        sortOrderOptions={sortOrderOptions}
                                        sortBy={sortBy}
                                        sortOrder={sortOrder}
                                        onhandleChange={(event, name) => handleChangeSelect(event, name, CONSTANTS.STANDARD_ERROR_TAG)}
                                        onhandleBlur={(event, name) => onHandleBlurSelect(event, name, CONSTANTS.STANDARD_ERROR_TAG)}
                                        handleAdd={handleAddProjectFormModal}
                                        handleReset={() => setSortFields(defaultSortFields)}
                                        sortFor={CONSTANTS.FOR_PROJECT}>

                                    </Sort>
                                    {/* <FormModal action={CONSTANTS.ADD_ACTION} show={modalShow} form={CONSTANTS.FOR_STUDENT} onHide={() => setModalShow(false)} /> */}

                                    <div>
                                        {
                                            !!projects && !!projects.length ?
                                                <TableComponent
                                                    tableFor={CONSTANTS.FOR_PROJECT}
                                                    tableData={projects}
                                                    handleEdit={(project) => handleEditProject(project)}
                                                    handleDelete={(project) => handleDeleteProject(project)}
                                                    sortByProp={sortBy}
                                                    sortOrderProp={sortOrder} />

                                                : <p>No projects data available.</p>
                                        }
                                    </div>
                                </>
                                :
                                <>
                                    <ButtonsContainer>
                                        <p>No projects data available.</p>
                                        <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={handleAddProjectFormModal}>Add Project</Button>
                                    </ButtonsContainer>
                                </>
                        }
                    </>
                </ProjectsTab>
        }
        </>
    );
}

export default Projects;
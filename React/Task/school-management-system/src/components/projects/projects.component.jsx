import Button from "../button/button.component";
import React, { useState , useEffect} from 'react';
import FormModal from "../modal/form-modal.component";
import { CONSTANTS } from "../../constants/constants.js";
import { useDispatch, useSelector } from 'react-redux';
import { selectStudents } from "../../store/students/student.selector";
import { selectProjects } from "../../store/projects/project.selector";
import { ProjectsTab } from "./projects.styles";
import { selectCurrentUser } from "../../store/user/user.selector";
import { deleteStudentStart } from "../../store/students/student.action";
import ConfirmModal from "../modal/confirm-modal.component";
import TableComponent from "../table/table.component";
import { deleteProjectStart } from "../../store/projects/project.action";

const defaultModalProps = {
    action: CONSTANTS.ADD_ACTION,
    show: false,
    form: CONSTANTS.FOR_PROJECT,
    data: {}
}

const Projects = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const [modalProps, setModalProps] = useState(defaultModalProps);
    const students = useSelector(selectStudents);
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
        // setSelectedStudent(student);
        // setModalShow(true);
    }

    const handleDeleteProject = (project) => {
        const updatedModelProps = { ...modalProps };
        updatedModelProps.action = CONSTANTS.DELETE_ACTION;
        updatedModelProps.data = project;
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
    }

    const flattenedStudents = students.flatMap(({ standard, divisions }) => {
        return divisions.flatMap(({ division, students }) => {
            return students.map(({ dob, email, name, rollNo, subject }) => {
                return { dob, email, name, rollNo, subject, standard, division };
            });
        });
    });

    
    return (
        <ProjectsTab>
            <Button type='button' onClick={handleAddProjectFormModal}>Add Project</Button>
            {/* <FormModal action={CONSTANTS.ADD_ACTION} show={modalShow} form={CONSTANTS.FOR_STUDENT} onHide={() => setModalShow(false)} /> */}
            {
                modalProps.action === CONSTANTS.DELETE_ACTION ? <ConfirmModal action={modalProps.action} show={modalProps.show} form={modalProps.form} data={modalProps.data} onHide={handleHideModal} onConfirm={handleConfirm} /> : <FormModal action={modalProps.action} show={modalProps.show} form={modalProps.form} data={modalProps.data} onHide={handleHideModal} />
            }

            <div>
                {
                    !!projects && !!projects.length ?
                        <TableComponent
                            tableFor={CONSTANTS.FOR_PROJECT}
                            tableData={projects}
                            handleEdit={(project) => handleEditProject(project)}
                            handleDelete={(project) => handleDeleteProject(project)} />
                        
                        : <p>No projects data available.</p>
                }

            </div>
        </ProjectsTab>
    );
}

export default Projects;
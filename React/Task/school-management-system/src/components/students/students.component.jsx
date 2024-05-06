import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import React, { useState, useEffect } from 'react';
import FormModal from "../modal/form-modal.component";
import { CONSTANTS } from "../../constants/constants.js";
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectStudents } from "../../store/students/student.selector";
import ConfirmModal from "../modal/confirm-modal.component";
import { deleteStudentStart, fetchStudentsStart } from "../../store/students/student.action";
import { StudentsTab } from "./students.styles";
import TableComponent from "../table/table.component";
import Spinner from "../spinner/spinner.component";
import { selectProjects } from "../../store/projects/project.selector";
import { deleteProjectStart } from "../../store/projects/project.action";

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
    const students = useSelector(selectStudents);

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
        updatedModelProps.data = {student: student, projects: projects};
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
        // setSelectedStudent(student);
        // setModalShow(true);
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
        updatedModelProps.data = {student: student, projects: projects, project: getProjectWithEmail(student.email)};
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
    }

    const handleConfirm = () => {
        try {
            dispatch(deleteStudentStart(students, modalProps.data));
            
        } catch (error) {
            console.log('Student Deletion encountered an error', error);
        }
        setModalProps(defaultModalProps);
    }

    const flattenedStudents = students?.flatMap(({ standard, divisions }) => {
        return divisions.flatMap(({ division, students }) => {
            return students.map(({ dob, email, name, rollNo, subject }) => {
                return { dob, email, name, rollNo, subject, standard, division };
            });
        });
    });


    return (
        <> {
            isLoading ?
                <>
                    < Spinner />
                </>
                :
                <StudentsTab>
                    <Button type='button' onClick={handleAddStudentFormModal}>Add Student</Button>
                    {/* <FormModal action={CONSTANTS.ADD_ACTION} show={modalShow} form={CONSTANTS.FOR_STUDENT} onHide={() => setModalShow(false)} /> */}
                    {
                        modalProps.action === CONSTANTS.DELETE_ACTION ? <ConfirmModal action={modalProps.action} show={modalProps.show} form={modalProps.form} data={modalProps.data} onHide={handleHideModal} onConfirm={handleConfirm} /> : <FormModal action={modalProps.action} show={modalProps.show} form={modalProps.form} data={modalProps.data} onHide={handleHideModal} />
                    }

                    <div>
                        {
                            !!flattenedStudents && !!flattenedStudents.length ?
                                <TableComponent
                                    tableFor={CONSTANTS.FOR_STUDENT}
                                    tableData={flattenedStudents}
                                    handleEdit={(student) => handleEditStudent(student)}
                                    handleDelete={(student) => handleDeleteStudent(student)} />
                                // <Table>
                                //     <thead >
                                //            <tr>
                                //                 <th>Sr.No.</th>
                                //                 <th>Standard</th>
                                //                 <th>Division</th>
                                //                 <th>Roll No</th>
                                //                 <th>Name</th>
                                //                 <th>Email</th>
                                //                 <th>Date of Birth</th>
                                //                 <th>Subject</th>
                                //                 <th>Action</th>
                                //             </tr>
                                //     </thead>
                                //     <tbody>
                                //         {flattenedStudents.map((student, index) => (
                                //           console.log(student[`${div}`]),
                                //             <tr key={index}>
                                //                 <td>{index+1}</td>
                                //                 <td>{student.standard}</td>
                                //                 <td>{student.division}</td>
                                //                 <td>{student.rollNo}</td>
                                //                 <td>{student.name}</td>
                                //                 <td>{student.email}</td>
                                //                 <td>{student.dob}</td>
                                //                 <td>{student.subject}</td>
                                //                 <td>                                            
                                //                         <Actions>
                                //                             <Button onClick={() => handleEditStudent(student)}>Edit</Button>
                                //                             <Button onClick={() => handleDeleteStudent(student)} buttonType={BUTTON_TYPE_CLASSES.delete}>Delete</Button>
                                //                         </Actions>

                                //                 </td>
                                //             </tr>

                                //         ))}
                                //     </tbody>
                                // </Table>
                                : <p>No students data available.</p>
                        }

                    </div>
                </StudentsTab>
        }
        </>
    );
}

export default Students;
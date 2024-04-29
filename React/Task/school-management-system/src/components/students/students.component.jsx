import Button from "../button/button.component";
import React, { useState, useEffect } from 'react';
import FormModal from "../modal/form-modal.component";
import { CONSTANTS } from "../../constants/constants.js";
import { useDispatch, useSelector } from 'react-redux';
import { selectStudents } from "../../store/students/student.selector";
import ConfirmModal from "../modal/confirm-modal.component";
import { deleteStudentStart } from "../../store/students/student.action";
import ToastEle from "../toast/toast.component";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectToastReducer } from "../../store/toasts/toast.selector";
import { showToast } from "../../store/toasts/toast.action";

const defaultModalProps = {
    action: CONSTANTS.ADD_ACTION,
    show: false,
    form: CONSTANTS.FOR_STUDENT,
    data: {}
}
const Students = () => {

    const dispatch = useDispatch();
    const [modalProps, setModalProps] = useState(defaultModalProps);



    const students = useSelector(selectStudents);


    const handleStudentShowModal = () => {
        const updatedModelProps = { ...modalProps };
        updatedModelProps.action = CONSTANTS.ADD_ACTION;
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
    }

    const handleEditStudent = (student) => {
        const updatedModelProps = { ...modalProps };
        updatedModelProps.action = CONSTANTS.EDIT_ACTION;
        updatedModelProps.data = student;
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
        // setSelectedStudent(student);
        // setModalShow(true);
    }

    const handleHideModal = () => {
        // toast("Model Hide!");
        dispatch(showToast('FROM COMPONENT'));
        setModalProps(defaultModalProps);
    }
    const handleConfirm = () => {
        console.log('HANDLE ', modalProps.data);
        try {
            dispatch(deleteStudentStart(students, modalProps.data));
            toast("Student Deleted Successfully");
        } catch (error) {
            console.log('Student Deletion encountered an error', error);
        }

        setModalProps(defaultModalProps);
    }

    const handleDeleteStudent = (student) => {
        const updatedModelProps = { ...modalProps };
        updatedModelProps.action = CONSTANTS.DELETE_ACTION;
        updatedModelProps.data = student;
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
    }


    // useEffect(() => {
    //     addCollectionAndDocuments('students', STUDENT_DATA);

    //   }, []);
    // Flatten the nested structure of students data
    // Check if students is defined and has length greater than 0
    if (!students || students.length === 0) {
        // return <p>No students data available.</p>;
    }

    // Flatten the nested structure of students data
    // const flattenedStudents = students.flatMap(standard => {
    //     if (!standard.divisions || standard.divisions.length === 0) {
    //         return [];
    //     }
    //     return standard.divisions.map(division => ({
    //         standard: standard.standard,
    //         division: division.division,
    //         ...division.students[0]
    //     }));
    // });
    const flattenedStudents = students.flatMap(({ standard, divisions }) => {
        return divisions.flatMap(({ division, students }) => {
            return students.map(({ dob, email, name, rollNo, subject }) => {
                return { dob, email, name, rollNo, subject, standard, division };
            });
        });
    });
    console.log('FLAT ', flattenedStudents);

    return (
        <>
            {/* <ToastEle /> */}
            <Button type='button' onClick={handleStudentShowModal}>Add Student</Button>
            {/* <FormModal action={CONSTANTS.ADD_ACTION} show={modalShow} form={CONSTANTS.FOR_STUDENT} onHide={() => setModalShow(false)} /> */}
            {
                modalProps.action === CONSTANTS.DELETE_ACTION ? <ConfirmModal action={modalProps.action} show={modalProps.show} form={modalProps.form} data={modalProps.data} onHide={handleHideModal} onConfirm={handleConfirm} /> : <FormModal action={modalProps.action} show={modalProps.show} form={modalProps.form} data={modalProps.data} onHide={handleHideModal} />
            }

            <div>
                {
                    !!flattenedStudents && !!flattenedStudents.length ?

                        <table>
                            <thead>
                                <tr>
                                    <th>Standard</th>
                                    <th>Division</th>
                                    <th>Roll No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date of Birth</th>
                                    <th>Subject</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flattenedStudents.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.standard}</td>
                                        <td>{student.division}</td>
                                        <td>{student.rollNo}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.dob}</td>
                                        <td>{student.subject}</td>
                                        <td>
                                            <td>
                                                <Button onClick={() => handleEditStudent(student)}>Edit</Button>
                                                <Button onClick={() => handleDeleteStudent(student)}>Delete</Button>
                                            </td>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        : <p>No students data available.</p>
                }

            </div>
        </>
    );
}

export default Students;
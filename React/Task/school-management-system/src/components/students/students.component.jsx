import Button from "../button/button.component";
import React, { useState, useEffect } from 'react';
import FormModal from "../modal/form-modal.component";
import { CONSTANTS } from "../../constants/constants.js";
import { addCollectionAndDocuments, getStudentsAndDocuments } from '../../utils/firebase/firebase.utils';
import STUDENT_DATA from '../../assets/students-data';
import { useSelector } from 'react-redux';
import { selectStudents } from "../../store/students/student.selector";

const defaultModalProps = {
    action: CONSTANTS.ADD_ACTION,
    show: false,
    form: CONSTANTS.FOR_STUDENT,
    data: {}
}
const Students = () => {

    const [modalShow, setModalShow] = useState(false);
    const [modalProps, setModalProps] = useState(defaultModalProps);

    const [selectedStudent, setSelectedStudent] = useState(null);

    const {show } = modalProps;
    const students = useSelector(selectStudents);
    console.log(students);

    const handleStudentShowModal = () => {
        const updatedModelProps = {...modalProps};
        updatedModelProps.action = CONSTANTS.ADD_ACTION;
        
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
    }

    const handleEditStudent = (student) => {
        console.log(student);
        const updatedModelProps = {...modalProps};
        updatedModelProps.action = CONSTANTS.EDIT_ACTION;
        updatedModelProps.data = student;
        updatedModelProps.show = true;
        setModalProps(updatedModelProps);
        // setSelectedStudent(student);
        // setModalShow(true);
    }
    const handleHideModal = () => {
       
        const updatedModelProps = {...modalProps};
        // updatedModelProps.action = CONSTANTS.EDIT_ACTION;
        // updatedModelProps.data = student;
        // updatedModelProps.show = true;
        setModalProps(defaultModalProps);
        // setSelectedStudent(student);
        // setModalShow(true);
    }

    const handleDeleteStudent = (student) => {
        // Implement delete functionality here
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
    const flattenedStudents = students.flatMap(standard => {
        if (!standard.divisions || standard.divisions.length === 0) {
            return [];
        }
        return standard.divisions.map(division => ({
            standard: standard.standard,
            division: division.division,
            ...division.students[0]
        }));
    });

    return (
        <>
            <Button type='button' onClick={handleStudentShowModal}>Add Student</Button>
            {/* <FormModal action={CONSTANTS.ADD_ACTION} show={modalShow} form={CONSTANTS.FOR_STUDENT} onHide={() => setModalShow(false)} /> */}
            <FormModal action={modalProps.action} show={modalProps.show} form={modalProps.form} data={modalProps.data} onHide={handleHideModal}/>
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
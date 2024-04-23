import Button from "../button/button.component";
import React, { useState, useEffect } from 'react';
import FormModal from "../modal/form-modal.component";
import { CONSTANTS } from "../../constants/constants.js";
import { addCollectionAndDocuments, getStudentsAndDocuments } from '../../utils/firebase/firebase.utils';
import STUDENT_DATA from '../../assets/students-data';
import { useSelector } from 'react-redux';
import { selectStudents } from "../../store/students/student.selector";

const Students = () => {

    const [modalShow, setModalShow] = useState(false);
    
    const students = useSelector(selectStudents);
    console.log(students);

    const handleStudentShowModal = () => {
        setModalShow(true);
    }


    // useEffect(() => {
    //     addCollectionAndDocuments('students', STUDENT_DATA);
        
    //   }, []);
    return (
        <>   
            <Button type='button' onClick={(handleStudentShowModal)} >Add Student</Button>           
            <FormModal action={CONSTANTS.ADD_ACTION}  show={modalShow} form={CONSTANTS.FOR_STUDENT} onHide={() => setModalShow(false)} />
        </>
    );
}

export default Students;
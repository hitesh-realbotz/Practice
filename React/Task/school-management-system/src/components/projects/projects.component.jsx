import Button from "../button/button.component";
import React, { useState , useEffect} from 'react';
import FormModal from "../modal/form-modal.component";
import { CONSTANTS } from "../../constants/constants.js";
import { useSelector } from 'react-redux';
import { selectStudents, selectStudentsMap } from "../../store/students/student.selector";


const Projects = () => {

    const [modalShow, setModalShow] = useState(false);

    const handleStudentShowModal = () => {
        setModalShow(true);
    }
 
    const student = useSelector(selectStudents);
    console.log(student);

    return (
        <>   
            <Button type='button' onClick={(handleStudentShowModal)} >Add Project</Button>           
            <FormModal action={CONSTANTS.ADD_ACTION}  show={modalShow} form={CONSTANTS.FOR_PROJECT} onHide={() => setModalShow(false)} />
        </>
    );
}

export default Projects;
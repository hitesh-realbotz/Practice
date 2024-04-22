import Button from "../button/button.component";
import React, { useState } from 'react';
import FormModal from "../modal/form-modal.component";
import { CONSTANTS } from "../../constants/constants.js";

const Projects = () => {

    const [modalShow, setModalShow] = useState(false);

    const handleStudentShowModal = () => {
        setModalShow(true);
    }
    return (
        <>   
            <Button type='button' onClick={(handleStudentShowModal)} >Add Project</Button>           
            <FormModal action={CONSTANTS.ADD_ACTION}  show={modalShow} form={CONSTANTS.FOR_PROJECT} onHide={() => setModalShow(false)} />
        </>
    );
}

export default Projects;
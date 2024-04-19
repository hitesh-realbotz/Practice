import Button from "../button/button.component";
import React, { useState } from 'react';
import FormModal from "../modal/form-modal.component";
import { CONSTANTS } from "../../constants/constants.js";

const Students = () => {

    const [modalShow, setModalShow] = useState(false);

    const handleStudentShowModal = () => {
        setModalShow(true);
    }

    return (
        <>   
            <Button type='button' onClick={(handleStudentShowModal)} >Add Student</Button>           
            <FormModal action={CONSTANTS.ADD_ACTION}  show={modalShow} form={CONSTANTS.FOR_STUDENT} onHide={() => setModalShow(false)} />
        </>
    );
}

export default Students;
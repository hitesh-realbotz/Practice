import { Link } from "react-router-dom";
import { SideBarContent, SideBarLink } from "./sidebar.styles";
import React, { useState } from 'react';
import FormModal from "../modal/form-modal.component";

const SideBar = () => {
    const [show, setModalShow] = useState(false);
    const [form, setForm] = useState('Student');

    const handleStudentShowModal = () => {
        setForm('Student');
        setModalShow(true);

    }
    const handleProjectShowModal = () => {
        setForm('Project');
        setModalShow(true);
    }

    return (
        <>
            <SideBarContent>
                <SideBarLink>
                    <Link to='/students' >Students</Link>
                    {/* <Link onClick={(handleStudentShowModal)}>Students</Link> */}
                </SideBarLink>
                <SideBarLink>
                    <Link to='/projects'>Projects</Link>
                    {/* <Link onClick={(handleProjectShowModal)}>Projects</Link> */}
                </SideBarLink>

                <FormModal show={show} form={form} onHide={() => setModalShow(false)} />
            </SideBarContent>
        </>
    );
}

export default SideBar;
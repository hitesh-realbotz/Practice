import { NavLink, SideBarContent, SideBarLink } from "./sidebar.styles";
import React, { useState } from 'react';
import FormModal from "../modal/form-modal.component";

const SideBar = () => {
    const [show, setModalShow] = useState(false);
    const [tab, setTab] = useState('');

    const handleTabSelection = (tab) => {
        setTab(tab);

    }


    return (
        <>
            <SideBarContent>
                <SideBarLink isActive={tab === 'Students'}>
                    <NavLink to='/students' onClick={() => handleTabSelection('Students')} >Students</NavLink>
                    {/* <Link onClick={(handleStudentShowModal)}>Students</Link> */}
                </SideBarLink>
                <SideBarLink isActive={tab === 'Projects'}>
                    <NavLink to='/projects' onClick={() => handleTabSelection('Projects')}>Projects</NavLink>
                    {/* <Link onClick={(handleProjectShowModal)}>Projects</Link> */}
                </SideBarLink>
            </SideBarContent>
        </>
    );
}

export default SideBar;
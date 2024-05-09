import { NavLink, SideBarContent, SideBarLink } from "./sidebar.styles";
import React, { useEffect, useState } from 'react';
import { getStoredRoute } from "../../utils/navigation/navigation.utils";
import { CONSTANTS } from "../../constants/constants";
import { faBook, faGauge, faPerson } from '@fortawesome/free-solid-svg-icons';
import Icon from "../icon/icon.component";

const SideBar = () => {
    
    let currentTab = getStoredRoute();
    const [tab, setTab] = useState((currentTab === CONSTANTS.HOME_ROUTE_PATH || currentTab === CONSTANTS.SIGN_UP_ROUTE_PATH) ? CONSTANTS.DASHBOARD_ROUTE_PATH : currentTab);
   
    useEffect(() => {
        setTab(window.location.pathname);
    }, [window.location.pathname]);

    const handleTabSelection = (tab) => {
        setTab(tab);
    }

    return (
        <>
            <SideBarContent>
                <SideBarLink isActive={tab === CONSTANTS.DASHBOARD_ROUTE_PATH}>
                    <NavLink to={CONSTANTS.DASHBOARD_ROUTE_PATH} onClick={() => handleTabSelection(CONSTANTS.DASHBOARD_ROUTE_PATH)} >
                        <Icon icon={faGauge} size="sm" style={{ color: CONSTANTS.ICON_COLOR_WHITE, }}/> DashBoard</NavLink>
                </SideBarLink>
                <SideBarLink isActive={tab === CONSTANTS.STUDENTS_ROUTE_PATH}>
                    <NavLink to={CONSTANTS.STUDENTS_ROUTE_PATH} onClick={() => handleTabSelection(CONSTANTS.STUDENTS_ROUTE_PATH)} >
                    <Icon icon={faPerson} size="sm" style={{ color: CONSTANTS.ICON_COLOR_WHITE, }}/> Students</NavLink>
                </SideBarLink>
                <SideBarLink isActive={tab === CONSTANTS.PROJECTS_ROUTE_PATH}>
                    <NavLink to={CONSTANTS.PROJECTS_ROUTE_PATH} onClick={() => handleTabSelection(CONSTANTS.PROJECTS_ROUTE_PATH)}>
                    <Icon icon={faBook} size="sm" style={{ color: CONSTANTS.ICON_COLOR_WHITE, }}/> Projects</NavLink>
                </SideBarLink>
            </SideBarContent>
        </>
    );
}

export default SideBar;
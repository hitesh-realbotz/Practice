import { Fragment } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { selectCurrentUser, selectIsLoading } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';
import { faSchool } from '@fortawesome/free-solid-svg-icons';

import {
    NavigationContainer,
    NavLinks,
    NavLink,
    LogoContainer,
    HomeContainer,
    SideBarContainer,
    Title,
} from './navigation.styles';
import SideBar from '../../components/sidebar/sidebar.component';
import { setStoredRoute } from '../../utils/navigation/navigation.utils';
import { CONSTANTS } from '../../constants/constants';
import Spinner from '../../components/spinner/spinner.component';
import Icon from '../../components/icon/icon.component';


const Navigation = () => {
    const dispatch = useDispatch();

    let isLoading = useSelector(selectIsLoading)

    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    const signOutUser = () => {
        dispatch(signOutStart());
    }
    const handleOnTitle = () => {
        if (currentUser) {
            setStoredRoute(CONSTANTS.DASHBOARD_ROUTE_PATH);
            navigate(CONSTANTS.DASHBOARD_ROUTE_PATH);

        } else {
            setStoredRoute(CONSTANTS.HOME_ROUTE_PATH);
            navigate(CONSTANTS.HOME_ROUTE_PATH);
        }
    }

    return (
        <Fragment>

            <NavigationContainer>
                <div class="container-fluid">
                    <Title onClick={handleOnTitle}>
                        <LogoContainer to={CONSTANTS.HOME_ROUTE_PATH}>
                            <Icon icon={faSchool} width={40} size="2xl" style={{ color: CONSTANTS.ICON_COLOR_WHITE, }} />
                        </LogoContainer>
                        SchoolManagementSystem
                    </Title>
                    <NavLinks>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarCollapse">
                            <div class="d-flex " role="search">
                                {((currentUser || isLoading)) ? (
                                    <ul class="navbar-nav me-auto mb-2 mb-md-0">
                                        <li class="nav-item">
                                            {/* <a class="nav-link" href={CONSTANTS.HOME_ROUTE_PATH} onClick={signOutUser}>SIGN OUT</a> */}
                                            <NavLink to={CONSTANTS.HOME_ROUTE_PATH} onClick={signOutUser}>SIGN OUT</NavLink>
                                        </li>
                                    </ul>
                                ) : (
                                    <>
                                        <ul class="navbar-nav me-auto mb-2 mb-md-0">
                                            <li class="nav-item">
                                                <NavLink to={CONSTANTS.HOME_ROUTE_PATH}>SIGN IN</NavLink>
                                            </li>
                                            <li class="nav-item">
                                                <NavLink to={CONSTANTS.SIGN_UP_ROUTE_PATH}>SIGN UP</NavLink>
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    </NavLinks>
                </div>
            </NavigationContainer>

            {/* <NavigationContainer>
                <LogoContainer to={CONSTANTS.HOME_ROUTE_PATH}>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <Title onClick={handleOnTitle}>SchoolManagementSystem
                </Title>
                <NavLinks>
                    {((currentUser || isLoading)) ? (
                        <NavLink to={CONSTANTS.HOME_ROUTE_PATH} onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <>
                            <NavLink to={CONSTANTS.HOME_ROUTE_PATH}>SIGN IN</NavLink>
                            <NavLink to={CONSTANTS.SIGN_UP_ROUTE_PATH}>SIGN UP</NavLink>
                        </>
                    )}
                </NavLinks>
            </NavigationContainer> */}

            {
                isLoading ? <Spinner /> :
                    (currentUser
                        ? (<HomeContainer>
                            <SideBarContainer>
                                <Routes>
                                    <Route path='/*' element={<SideBar />} />
                                </Routes>
                            </SideBarContainer>
                            <Outlet />
                        </HomeContainer>
                        )
                        :
                        (<HomeContainer>
                            <Outlet />
                        </HomeContainer>))
            }




        </Fragment >
    );
};

export default Navigation;

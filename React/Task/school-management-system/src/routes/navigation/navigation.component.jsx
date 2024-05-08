import { Fragment } from 'react';
import { Link, Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { selectCurrentUser, selectIsLoading } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';

// import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { ReactComponent as CrwnLogo } from '../../assets/school-building-icon.svg';

import {
    NavigationContainer,
    NavLinks,
    NavLink,
    LogoContainer,
    HomeContainer,
    SideBarContainer,
    Title
} from './navigation.styles';
import SideBar from '../../components/sidebar/sidebar.component';
import { setStoredRoute } from '../../utils/navigation/navigation.utils';
import { CONSTANTS } from '../../constants/constants';
import Spinner from '../../components/spinner/spinner.component';


const Navigation = () => {
    const dispatch = useDispatch();

    let isLoading = useSelector(selectIsLoading)

    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    const signOutUser = () => {
        dispatch(signOutStart());
    }
    const handleOnTitle = () => {
        console.log('ONTITLE');

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
                <LogoContainer to={CONSTANTS.HOME_ROUTE_PATH}>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <Title onClick={handleOnTitle}>SchoolManagementSystem                   
                    {/* <NavLink to={CONSTANTS.DASHBOARD_ROUTE_PATH} >SchoolManagementSystem</NavLink>    */}
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
            </NavigationContainer>

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




        </Fragment>
    );
};

export default Navigation;

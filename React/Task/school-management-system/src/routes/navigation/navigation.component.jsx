import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { selectCurrentUser, selectIsUserLoading } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';

// import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { ReactComponent as CrwnLogo } from '../../assets/school-building-icon.svg';

import {
    NavigationContainer,
    NavLinks,
    NavLink,
    LogoContainer,
    HomeContainer,
    SideBarContainer
} from './navigation.styles';
import SideBar from '../../components/sidebar/sidebar.component';


const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    console.log(currentUser);

    const signOutUser = () => dispatch(signOutStart());

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    {/* <NavLink to='/shop'>SHOP</NavLink> */}

                    {currentUser ? (
                        <NavLink to='/' onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <>
                            <NavLink to='/'>SIGN IN</NavLink>
                            <NavLink to='/sign-up'>SIGN Up</NavLink>
                        </>
                    )}
                </NavLinks>
            </NavigationContainer>

            {
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

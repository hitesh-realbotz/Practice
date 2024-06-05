"use client"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShopIcon from '@mui/icons-material/Shop';
import { useEffect, useState } from 'react';
import { CART, DASHBOARD, LOGIN, LOGOUT, ORDERS, PRODUCTS, PROFILE } from '@/config/constants';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByEmailId, logoutUser, setUser } from '../store/userSlice';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { resetProducts } from '../store/productSlice';



const Navbar = () => {

    const dispatch = useDispatch();
    const userState = useSelector((data) => data.usersData);
    useEffect(() => {
        async function fetchUser() {
            const email = Cookies.get("userEmail");
            if (email) {
                const user = await dispatch(getUserByEmailId({ email }));
                console.log("UserByID ", user.payload);
                console.log("Cookies ", Cookies.get());
                dispatch(setUser(user.payload));
            }
        }
        fetchUser();
    }, []);

    // const pages = userState.isLoggedIn ? [PRODUCTS, CART, DASHBOARD] : [PRODUCTS];
    const pages = userState.isLoggedIn ? [] : [PRODUCTS];
    const settings = [PROFILE, DASHBOARD, CART, ORDERS, LOGOUT];

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleUserMenuAction = (route) => {
        console.log("click ", route);
        if (route === "/") {
            dispatch(logoutUser());
        }
        navigate(route);
    };
    
    const router = useRouter();
    const navigate = (route) => {
        router.push(route);
    }
    const handleGetProducts = () => {
        dispatch(resetProducts());
    };

    return (
        <AppBar position="fixed" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ShopIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => navigate("/")}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        E-Shop
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        {/* <a href={page === LOGIN ? "/auth" : (page === PRODUCTS ? "/" : page.toLowerCase())}>
                                            {page}
                                        </a> */}
                                        <Link href={page === LOGIN ? "/auth" : (page === PRODUCTS ? "/" : page.toLowerCase())}>{page}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <ShopIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        E-Shop
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link key={page}
                                className='btn btn-outline-light border-0'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                href={page === LOGIN ? "/auth" : (page === PRODUCTS ? "/" : page.toLowerCase())}
                            >
                                {page}
                            </Link>
                        ))}
                    </Box>
                    {
                        userState.isLoggedIn ?
                            <>
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar src="" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center" component="span" onClick={() => handleUserMenuAction(setting == LOGOUT ? "/" : `/${setting.toLowerCase()}`)} >
                                                    {/* <Link href={setting != LOGOUT ? `/${setting.toLowerCase()}` : "/"} onClick={() => handleLogout(setting)} >{setting}</Link> */}
                                                    {setting}

                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                                {/* <Link
                                    className='btn btn-outline-light border-0'
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    href="/orders/bjj3kcA8MfPQkhazJC1GvZvfJcA2-1"
                                >
                                    OrderDetail
                                </Link>
                                <Link
                                    className='btn btn-outline-light border-0'
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    href="/product/13"
                                >
                                    ProductDetail
                                </Link> */}
                            </>
                            : <Box sx={{ flexGrow: 1, justifyContent: 'end', display: { xs: 'none', md: 'flex' } }}>

                                <Link
                                    className='btn btn-outline-light border-0'
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    href="/auth"
                                >
                                    LOGIN
                                </Link>
                                <Link
                                    className='btn btn-outline-light border-0'
                                    onClick={()=>handleGetProducts()}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    href="/"
                                >
                                    GetProducts
                                </Link>
                                {/* <Link
                                    className='btn btn-outline-light border-0'                                  
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    href="/orders/bjj3kcA8MfPQkhazJC1GvZvfJcA2-1"
                                >
                                    OrderDetail
                                </Link>
                                <Link
                                    className='btn btn-outline-light border-0'                                  
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    href="/product/13"
                                >
                                    ProductDetail
                                </Link> */}
                            </Box>
                    }

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;

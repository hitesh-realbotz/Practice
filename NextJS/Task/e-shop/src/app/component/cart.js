"use client"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/productSlice';
import { Box, Divider, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { addToCart, decreaseQtyFromCart, toggleItemIsChecked } from '@/utils/cart.utils';
import { updateUser } from '../store/userSlice';
import { toast } from 'react-toastify';

export default function Cart() {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState([0]);
    let userData = useSelector((data) => data.usersData.userData);
    let { cart } = userData;
    let products = useSelector((state) => state.productsData.products);
    const [detailedCart, setDetailedCart] = useState(cart);

    const setCartItems = () => {
        if (!!cart?.cartItems) {
            let cartProductIndex = [];
            cartProductIndex = cart.cartItems.map((cartItem) =>
                products.findIndex(p => p.itemId == cartItem.itemId)
            );
            const updatedCartItems = cart.cartItems.map((cartItem, index) => {
                return {
                    ...cartItem,
                    title: products[cartProductIndex[index]].title,
                    unitPrice: products[cartProductIndex[index]].price
                };
            });

            // Update the cart with updated cart items
            cart = {
                ...cart,
                cartItems: updatedCartItems
            };
            setDetailedCart(cart);
            return;
        }
        setDetailedCart("");

    }

    useEffect(() => {
        async function fetchAndSetPageProducts() {
            await dispatch(getProducts());
        }
        if (products.length) {
            setCartItems();
        } else {
            fetchAndSetPageProducts();
        }

    }, [products, cart]);

    const handleToggle = (item) => {
        console.log("handleToggle ", item.itemId);
        let updatedCart = toggleItemIsChecked(userData.cart, products.find(p => p.itemId == item.itemId));
        console.log("updatedCart  ", updatedCart);
        if (!!updatedCart) {
            let updatedUserData = { ...userData, cart: updatedCart };
            // Dispatch an action to update the user data in the store
            const response = dispatch(updateUser(updatedUserData));
            return;
        }
        toast.error("Try again!");
        return;
    };

    const handleIncreaseQty = (item) => {
        let updatedCart = addToCart(userData.cart, products.find(p => p.itemId == item.itemId));
        console.log("updatedCart  ", updatedCart);
        if (!!updatedCart) {
            let updatedUserData = { ...userData, cart: updatedCart };
            // Dispatch an action to update the user data in the store
            const response = dispatch(updateUser(updatedUserData));
            return;
        }
        toast.error("Try again!");
        return;
    }
    const handleDecreaseQty = (item) => {
        let updatedCart = decreaseQtyFromCart(userData.cart, products.find(p => p.itemId == item.itemId));
        console.log("updatedCart  ", updatedCart);
        if (!!updatedCart) {
            let updatedUserData = { ...userData, cart: updatedCart };
            // Dispatch an action to update the user data in the store
            const response = dispatch(updateUser(updatedUserData));
            return;
        }
        toast.info("Try again!");
        return;
    }

    return (
        <div  className="d-flex flex-column mt-3 justify-content-center align-items-center">
            {
                !!detailedCart?.cartItems?.length ?
                    <>
                        <div className=" cart-section d-flex flex-column justify-content-center align-items-center">

                            <Typography
                                sx={{ display: 'inline' }}
                                component="div"
                                variant="p"
                                color="text.primary"
                            >
                                <strong>Total Price : </strong>  <CurrencyRupeeIcon fontSize="inherit" /> {detailedCart.totalPrice}

                            </Typography>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="div"
                                variant="p"
                                color="text.primary"
                            >
                                <strong>Total Checked Price : </strong>  <CurrencyRupeeIcon fontSize="inherit" /> {detailedCart.totalCheckedPrice}
                            </Typography>
                        </div>

                        <List  sx={{ width: '100%' }} key={1}>
                            {detailedCart.cartItems.map((item) => {
                                const labelId = `checkbox-list-label-${item.itemId}`;

                                return (
                                    <>
                                        <ListItem
                                            key={item.itemId}
                                            disablePadding
                                        >
                                            <ListItemButton role={undefined} dense>
                                                <ListItemIcon>
                                                    <Checkbox onClick={() => handleToggle(item)}
                                                        edge="start"
                                                        checked={item.isChecked}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>
                                                {/* <ListItemText id={labelId} primary={`${item.itemId} ${item.title} `} /> */}
                                                <ListItemText
                                                    primary={`${item.title} `}
                                                    primaryTypographyProps={{ fontSize: 18, color: "primary", fontWeight: "medium" }}
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="p"
                                                                color="text.secondary"
                                                                fontWeight="medium"
                                                                fontSize={18}
                                                            >
                                                                <AddCircleOutlineIcon fontSize="small" onClick={() => handleIncreaseQty(item)} />
                                                                <strong className="mx-3">{item.qty}</strong>
                                                                <RemoveCircleOutlineIcon className="me-3" fontSize="small" onClick={() => handleDecreaseQty(item)} /> 
                                                                | 
                                                                <CurrencyRupeeIcon className="ms-3" fontSize="inherit" /><strong> {item.totalPrice} </strong>
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </>
                                );
                            })}
                        </List>
                    </>

                    : <></>
            }
        </div>
    );

}
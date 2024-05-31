"use client"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { Divider, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { addToCart, decreaseQtyFromCart, toggleItemIsChecked } from '@/utils/cart.utils';
import { updateUser } from '../store/userSlice';
import { toast } from 'react-toastify';
import ConfirmModal from './modal/confirm-modal';
import { CLEAR_CART_TITLE, DECREASE_CART_QTY_TITLE, REMOVE_CART_ITEM_TITLE } from '@/config/constants';
import { useRouter } from 'next/navigation';

const defaultModalProps = {
    isOpen: false,
    title: "",
    data: {},
    action: ""
}

export default function Cart() {
    const dispatch = useDispatch();
    const router = useRouter();
    let userData = useSelector((data) => data.usersData.userData);
    let { cart } = userData;
    let products = useSelector((state) => state.productsData.products);
    const [detailedCart, setDetailedCart] = useState(cart);
    const [modalProps, setModalProps] = useState(defaultModalProps);

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
            await dispatch(fetchProducts());
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
        
        return;
    }
    const handleConfirmDelete = () => {
        const item = modalProps.data?.item;

        let updatedCart = (modalProps.title === CLEAR_CART_TITLE || (userData.cart.cartItems.length === 1 && item.qty === 1))
            ? {}
            : decreaseQtyFromCart(userData.cart, products.find(p => p.itemId == item.itemId));
        console.log("updatedCart  ", updatedCart);
        setModalProps(defaultModalProps);
        if (!!updatedCart) {
            let updatedUserData = { ...userData, cart: updatedCart };
            const response = dispatch(updateUser(updatedUserData));
            return;
        }
        toast.info("Try again!");
        return;
    }

    const handleHideModal = () => {
        setModalProps(defaultModalProps);
    }


    const handleDecreaseQty = (item) => {
        let updatedModelProps = {};
        if (userData.cart.cartItems.length === 1 && item.qty === 1) {
            updatedModelProps = { ...modalProps, isOpen: true, title: REMOVE_CART_ITEM_TITLE, data: { item: { ...item }, message: CLEAR_CART_TITLE } };
        } else {
            updatedModelProps = { ...modalProps, isOpen: true, title: item.qty == 1 ? REMOVE_CART_ITEM_TITLE : DECREASE_CART_QTY_TITLE, data: { item: { ...item } } };
        }
        setModalProps(updatedModelProps);
    }

    const handleClearCart = () => {
        let updatedModelProps = { ...modalProps, isOpen: true, title: CLEAR_CART_TITLE };
        setModalProps(updatedModelProps);
    }
    const handleCheckout = () => {
        router.push("/payment");
    }


    return (
        <div className="d-flex flex-column mt-3 justify-content-center align-items-center">
            {
                !!detailedCart?.cartItems?.length ?
                    <>
                        <div className=" cart-section d-flex flex-column justify-content-center align-items-center">

                            {
                                modalProps.isOpen ? <ConfirmModal isOpen={modalProps.isOpen}
                                    title={modalProps.title}
                                    data={modalProps.data}
                                    onConfirm={handleConfirmDelete}
                                    onClose={handleHideModal}
                                />
                                    : <></>
                            }
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
                            <div className="d-flex justify-content-center">

                                <button className="btn btn-primary m-3" onClick={handleCheckout} >
                                    Checkout
                                </button>
                                <button className="btn btn-secondary m-3" onClick={handleClearCart} >
                                    Clear Cart
                                </button>
                            </div>
                        </div>

                        <List sx={{ width: '100%' }} key={1}>
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
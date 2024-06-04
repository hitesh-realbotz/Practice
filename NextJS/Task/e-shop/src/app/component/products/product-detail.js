"use client"
import { fetchProduct } from '@/app/store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductField, { InlineProductField } from './product-field';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { addToCart } from '@/utils/cart.utils';
import { updateUser } from '@/app/store/userSlice';
import { toast } from 'react-toastify';


const ProductDetail = (props) => {
    const dispatch = useDispatch();
    const userState = useSelector((data) => data.usersData);
    let { userData } = userState;
    const [item, setItem] = useState(false);
    const [isCart, setIsCart] = useState(!!userData?.cart?.cartItems?.length);
    useEffect(() => {
        if (isCart && !!userData?.cart?.cartItems?.length) {
            return;
        }
        setIsCart(!!userData?.cart?.cartItems?.length)
    }, [userData?.cart?.cartItems?.length]);

    console.log(Date.UTC());
    useEffect(() => {
        async function fetchAndSetProduct() {
            console.log("ProductDetailed useeffect ", props, props.itemId);

            const fetchedProductResponse = await dispatch(fetchProduct({ ...{ itemId: props.itemId } }));
            setItem(fetchedProductResponse.payload);
        }
        fetchAndSetProduct();

    }, []);

    const handleAddToCart = (item) => {
        if (userState.isLoggedIn) {
            if (item.availableQty) {
                let updatedCart = addToCart(userData.cart, item);
                console.log("updatedCart  ", updatedCart);
                if (!!updatedCart) {
                    let updatedUserData = { ...userData, cart: updatedCart };
                    // Dispatch an action to update the user data in the store
                    const response = dispatch(updateUser(updatedUserData));
                    console.log("handleAddToCart ", response);
                    return;
                }
                toast.error("Try Again!");
                return;
            }
            toast.error("Item out-of-stock!");
            return;

        }
        toast.info("Please login to add item in cart.");
    }

    return (
        <>
            {
                item ?
                
                    <>
                    <div className="d-flex justify-content-center align-items-center m-auto mt-3">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container direction="row"
                                spacing={{ xs: 2, md: 3 }} xs={12} sm={12} md={12} lg={12} xl={12}>

                                <Grid item direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center" spacing={{ xs: 2, md: 3 }}
                                    xs={12} sm={5} md={4} lg={4} xl={3}>
                                    
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img src={item.image} height={300} width={300}/>
                                    </div>
                                </Grid>
                                <Grid item container direction="column"
                                    xs={12} sm={7} md={8} lg={8} xl={9}>
                                    <ProductField title={"Title"} value={item.title} />
                                    <ProductField title={"Decription"} value={item.description} />
                                    <InlineProductField title={"Category"} value={item.category} />
                                    <InlineProductField title={"Brand"} value={item.brand} />
                                    <InlineProductField title={"Available Qty."} value={item.availableQty} />
                                    <InlineProductField title={"Price"} value={item.price} />
                                    <button className="btn btn-info" onClick={() => handleAddToCart(item)}>AddToCart <AddShoppingCartOutlinedIcon fontSize="inherit" /></button>
                                </Grid>


                            </Grid>
                        </Box>
                        </div>
                    </>
                    : <></>
            }
        </>
    );

}
export default ProductDetail;




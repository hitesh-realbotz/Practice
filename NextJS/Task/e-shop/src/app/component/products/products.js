"use client"
import { useDispatch, useSelector } from "react-redux";
import PaginationButtons from "../pagination-buttons";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getProducts } from "@/app/store/productSlice";
import { FOR_PRODUCT, ITEMS_PER_PAGE, SORT_BY_BRAND, SORT_BY_BRAND_LABEL, SORT_BY_CATEGORY, SORT_BY_CATEGORY_LABEL, SORT_BY_PRICE, SORT_BY_PRICE_LABEL, SORT_BY_TITLE, SORT_BY_TITLE_LABEL, SORT_ORDER_ASC, SORT_ORDER_DESC } from "@/config/constants";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { toast } from "react-toastify";
import Sort from "../sort";
import { getSortedData } from "@/utils/sort.utils";
import { addToCart } from "@/utils/cart.utils";
import { updateUser } from "@/app/store/userSlice";


const ProductList = () => {

    const dispatch = useDispatch();

    let products = useSelector((state) => state.productsData.products);
    const userState = useSelector((data) => data.usersData);
    let { userData } = userState;

    // const [pageProps, setPageProps] = useState({ pageProducts: [], page: 1, count: 10 });
    const defaultSortFields = {
        sortBy: SORT_BY_TITLE,
        sortOrder: SORT_ORDER_ASC,
        sortOptions: [
            { value: SORT_BY_TITLE, label: SORT_BY_TITLE_LABEL },
            { value: SORT_BY_CATEGORY, label: SORT_BY_CATEGORY_LABEL },
            { value: SORT_BY_PRICE, label: SORT_BY_PRICE_LABEL },
            { value: SORT_BY_BRAND, label: SORT_BY_BRAND_LABEL },
        ],
        sortOrderOptions: [
            { value: SORT_ORDER_ASC, label: SORT_ORDER_ASC },
            { value: SORT_ORDER_DESC, label: SORT_ORDER_DESC },
        ],
        pageProps: {
            pageProducts: [],
            page: 1,
            count: 10
        }
    }

    const [sortFields, setSortFields] = useState(defaultSortFields);
    const { sortBy, sortOrder, sortOptions, sortOrderOptions, pageProps } = sortFields;


    const getPaginatedData = (value, sortByProp = sortBy, sortOrderProp = sortOrder) => {

        products = getSortedData(sortByProp, sortOrderProp, products);
        const startIndex = 0 + ((value - 1) * ITEMS_PER_PAGE);
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const pageProductss = products.slice(startIndex, endIndex);
        const count = Math.ceil((products.length + 1) / ITEMS_PER_PAGE);

        setSortFields({ ...sortFields, sortBy: sortByProp, sortOrder: sortOrderProp, pageProps: { ...pageProps, pageProducts: pageProductss, page: value, count: count } });
    };
    const handleChange = (event, value) => {
        getPaginatedData(value);
    };

    useEffect(() => {
        async function fetchAndSetPageProducts() {
            await dispatch(getProducts());
        }
        if (products.length) {
            getPaginatedData(1,);
        } else {
            fetchAndSetPageProducts();
        }

    }, [products]);


    const handleAddToCart = (item) => {
        if (userState.isLoggedIn) {
            let updatedCart = addToCart(userData.cart, item);
            console.log("updatedCart  ", updatedCart);
            if (!!updatedCart) {
                let updatedUserData = { ...userData, cart: updatedCart };
                // Dispatch an action to update the user data in the store
                const response = dispatch(updateUser(updatedUserData));
                console.log("handleAddToCart ", response);
                return ;
            }
            toast.info("Try again!");
            return;
        }
        toast.info("Please login to add item in cart.");
    }



    const handleChangeSelect = (event, name) => {
        const { value } = event.target;
        // setSortFields({ ...sortFields, [name]: value });
        if (name == "sortBy") {
            getPaginatedData(1, value, sortOrder);
        } else {
            getPaginatedData(1, sortBy, value);
        }
    };
    const onHandleBlurSelect = (event, name) => {
        const { value } = event.target;
        if (value.length && value !== sortFields[name]) {
            handleChangeSelect(event, name);
            return;
        }
        return;
    };


    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex align-items-end">
                    <div className="mb-3">
                        <Pagination color="primary" count={pageProps.count} page={pageProps.page} onChange={handleChange} />
                    </div>
                    <div>
                        <Sort
                            sortOptions={sortOptions}
                            sortOrderOptions={sortOrderOptions}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onhandleChange={(event, name) => handleChangeSelect(event, name)}
                            onhandleBlur={(event, name) => onHandleBlurSelect(event, name)}
                            handleReset={() => getPaginatedData(1, defaultSortFields.sortBy, defaultSortFields.sortOrder)}
                            sortFor={FOR_PRODUCT}>
                        </Sort>
                    </div>
                </div>

                <Box sx={{ flexGrow: 1 }} className="product-container">
                    <Grid container direction="row"
                        justifyContent="space-evenly"
                        alignItems="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                        {
                            pageProps.pageProducts.length
                                ?
                                pageProps.pageProducts.map((item) => (
                                    <Grid justifyContent="center"
                                        alignItems="center" item xs={2} sm={6} md={6} lg={6} xl={4} key={item.id}>
                                        {/* <ProductCard key={product.id} item={product} /> */}
                                        <Card className="product-card" >
                                            <CardMedia
                                                sx={{ height: 200, width: 200 }}
                                                image={item.image}
                                                title={item.title}
                                            />
                                            <CardContent className="d-flex flex-column justify-content-center align-items-center">
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="p" component="div" color="text.secondary">
                                                    Brand : {item.brand}
                                                </Typography>
                                            </CardContent>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <Typography gutterBottom variant="p" component="div" className="mb-0">
                                                    <CurrencyRupeeIcon fontSize="inherit" /> {item.price}
                                                </Typography>
                                                <CardActions>
                                                    {/* <Button size="small">Add To Cart <AddShoppingCartOutlinedIcon fontSize="inherit" /> </Button> */}
                                                    <button className="btn btn-outline-info" onClick={() => handleAddToCart(item)}><AddShoppingCartOutlinedIcon fontSize="inherit" /> </button>
                                                </CardActions>
                                            </div>
                                        </Card>
                                    </Grid>
                                ))
                                :
                                <Typography>No Product.</Typography>

                        }
                    </Grid>
                </Box>
            </div>

        </>
    );
}
export default ProductList;


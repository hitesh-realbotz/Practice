"use client"
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/orderSlice";
import { fetchProducts } from "../../store/productSlice";
import DashboardField from "./dashboard-field";
import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { CART, DASHBOARD_TITLE_CART_CHECKED_PRICE, DASHBOARD_TITLE_CART_ITEMS, DASHBOARD_TITLE_CART_TOTAL_PRICE, ORDERS, PROFILE } from "@/config/constants";
import LoadingComp from "../loadingState";

const Dashboard = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const fetchedOrders = useSelector((state) => state.ordersData.orders);
    const userState = useSelector((data) => data.usersData);
    let { userData } = userState;

    const defaultDashboardData = {
        orders: {
            title: "Orders",
            count: fetchedOrders.length || 0,
        },
        cart: {
            title: "Cart",
            count: userData?.cart?.cartItems?.length ? userData?.cart?.cartItems?.length : 0,
            checkedPrice: !!userData?.cart?.totalCheckedPrice ? userData?.cart?.totalCheckedPrice : 0,
            totalPrice: userData?.cart?.totalPrice || 0,
        },
        profile: {
            title: "Profile",
            isSecurityQuestionSet: userData?.answer?.length ? true : false,
        },
        isLoading: true
    }

    const [dashboardData, setDashboardData] = useState(defaultDashboardData);
    let { orders, cart, profile, isLoading } = dashboardData;


    useEffect(() => {
        async function fetchAndSetOrders() {
            await dispatch(fetchOrders({ buyerId: userData.localId }));
        }

        //For change in orders
        if (orders.count !== fetchedOrders.length || !fetchedOrders.length) {
            fetchAndSetOrders();
            orders = { ...orders, count: fetchedOrders.length };
        }
        //For change in cart
        if (cart?.checkedPrice !== userData?.cart?.totalCheckedPrice) {
            cart = {
                ...cart,
                count: userData?.cart?.cartItems?.length ? userData?.cart?.cartItems?.length : 0,
                checkedPrice: userData?.cart?.totalCheckedPrice ? userData?.cart?.totalCheckedPrice : 0,
                totalPrice: userData?.cart?.totalPrice ? userData?.cart?.totalPrice : 0,
            };
            profile = {
                ...profile,
                isSecurityQuestionSet: !!userData?.answer?.length ? true : false,
            };
        }

        setDashboardData({
            ...dashboardData,
            cart: { ...cart },
            profile: { ...profile, },
            orders: { ...orders, },
            isLoading: false
        });

    }, [fetchedOrders, userState]);

    const handleRouteToField = (routeTo) => {
        router.push(`${routeTo}`);
    }

    return (
        <>
            {
                isLoading
                    ? <LoadingComp />
                    :
                    <>
                        <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                            <Box sx={{ flexGrow: 1 }} className="product-container">
                                <Grid container direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                                    <DashboardField
                                        handleToRoute={() => handleRouteToField(`/${PROFILE.toLowerCase()}`)}
                                        title={profile.title}
                                        value={profile.isSecurityQuestionSet ? "Want to update?" : "Set Security Question!"}
                                    />
                                    <DashboardField
                                        handleToRoute={() => handleRouteToField(`/${ORDERS.toLowerCase()}`)}
                                        title={ORDERS}
                                        value={orders.count} />
                                    <DashboardField
                                        handleToRoute={() => handleRouteToField(`/${CART.toLowerCase()}`)}
                                        title={DASHBOARD_TITLE_CART_ITEMS}
                                        value={cart.count} />
                                    <DashboardField
                                        handleToRoute={() => handleRouteToField(`/${CART.toLowerCase()}`)}
                                        title={DASHBOARD_TITLE_CART_TOTAL_PRICE}
                                        value={cart.totalPrice} />
                                    <DashboardField
                                        handleToRoute={() => handleRouteToField(`/${CART.toLowerCase()}`)}
                                        title={DASHBOARD_TITLE_CART_CHECKED_PRICE}
                                        value={cart.checkedPrice} />
                                </Grid>
                            </Box>
                        </div>
                    </>
            }
        </>
    );
}
export default Dashboard;


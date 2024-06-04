"use client"
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Sort from "../sort";
import { getSortedData } from "@/utils/sort.utils";
import { useRouter } from "next/navigation";
import { fetchOrders } from "@/app/store/orderSlice";
import { FOR_ORDER, ITEMS_PER_PAGE, SORT_BY_AMOUNT, SORT_BY_ORDER_DATE, SORT_BY_ORDER_DATE_LABEL, SORT_BY_PRICE_LABEL, SORT_ORDER_ASC, SORT_ORDER_DESC } from "@/config/constants";


const OrderList = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    let orders = useSelector((state) => state.ordersData.orders);
    const userState = useSelector((data) => data.usersData);
    let { userData } = userState;

    const defaultSortFields = {
        sortBy: SORT_BY_ORDER_DATE,
        sortOrder: SORT_ORDER_ASC,
        sortOptions: [
            { value: SORT_BY_ORDER_DATE, label: SORT_BY_ORDER_DATE_LABEL },
            { value: SORT_BY_AMOUNT, label: SORT_BY_PRICE_LABEL },
        ],
        sortOrderOptions: [
            { value: SORT_ORDER_ASC, label: SORT_ORDER_ASC },
            { value: SORT_ORDER_DESC, label: SORT_ORDER_DESC },
        ],
        pageProps: {
            pageOrders: [],
            page: 1,
            count: 10
        }
    }

    const [sortFields, setSortFields] = useState(defaultSortFields);
    const { sortBy, sortOrder, sortOptions, sortOrderOptions, pageProps } = sortFields;


    const getPaginatedData = (value, sortByProp = sortBy, sortOrderProp = sortOrder) => {

        orders = getSortedData(sortByProp, sortOrderProp, orders);
        const startIndex = 0 + ((value - 1) * ITEMS_PER_PAGE);
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const updatedPageOrders = orders.slice(startIndex, endIndex);
        const count = Math.ceil((orders.length + 1) / ITEMS_PER_PAGE);

        setSortFields({ ...sortFields, sortBy: sortByProp, sortOrder: sortOrderProp, pageProps: { ...pageProps, pageOrders: updatedPageOrders, page: value, count: count } });
    };
    const handleChange = (event, value) => {
        getPaginatedData(value);
    };

    useEffect(() => {
        async function fetchAndSetPageOrders() {
            await dispatch(fetchOrders({ buyerId: userData.localId }));
        }
        if (orders.length) {
            getPaginatedData(1,);
        } else {
            fetchAndSetPageOrders();
        }

    }, [orders]);


    const handleChangeSelect = (event, name) => {
        const { value } = event.target;
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

    const handleToOrder = (orderId) => {
        router.push(`/orders/${orderId}`);
    }

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center">
                {
                    pageProps.pageOrders.length
                        ?
                        <>

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
                                        sortFor={FOR_ORDER}>
                                    </Sort>
                                </div>
                            </div>
                            <Box sx={{ flexGrow: 1 }} className="product-container">
                                <Grid container direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>

                                    {
                                        < List sx={{ width: '100%' }} key={1}>
                                            {pageProps.pageOrders.map((order) => {
                                                const labelId = `checkbox-list-label-${order.orderId}`;
                                                return (
                                                    <>
                                                        <ListItem
                                                            key={order.orderId}
                                                            disablePadding
                                                        >
                                                            <ListItemButton role={undefined} dense onClick={() => handleToOrder(order.orderId)}>
                                                                <ListItemText
                                                                    primaryTypographyProps={{ fontSize: 18, color: "primary", fontWeight: "medium", display: "flex", flexDirection: "column" }}
                                                                    primary={
                                                                        <>
                                                                            <Typography
                                                                                sx={{ display: 'inline' }}
                                                                                component="span"
                                                                                variant="p"
                                                                                color="text.secondary"
                                                                                fontWeight="medium"
                                                                                fontSize={18}
                                                                            >

                                                                                <CurrencyRupeeIcon fontSize="inherit" />
                                                                                <strong className="me-3">{order.amount}/-</strong>
                                                                                |
                                                                                <strong> {order.orderDate} </strong>
                                                                            </Typography>
                                                                        </>
                                                                    }
                                                                    secondary={
                                                                        order.orderedItems.map((item) => {

                                                                            return <ListItemAvatar>
                                                                                <Avatar
                                                                                    alt={item.image}
                                                                                    src={item.image}
                                                                                />
                                                                            </ListItemAvatar>
                                                                        })
                                                                    }
                                                                    secondaryTypographyProps={{ fontSize: 18, color: "primary", fontWeight: "medium", display: "flex", padding: "15px" }}
                                                                />
                                                            </ListItemButton>
                                                        </ListItem>
                                                        <Divider variant="inset" component="li" />
                                                    </>
                                                );
                                            })}
                                        </List>
                                    }
                                </Grid>
                            </Box>
                        </>
                        :
                        <>
                        <div  className="d-flex justify-content-center align-items-center mt-5">

                            <Typography>No Orders Yet!.</Typography>
                        </div>
                        </>
                }
            </div >

        </>
    );
}
export default OrderList;


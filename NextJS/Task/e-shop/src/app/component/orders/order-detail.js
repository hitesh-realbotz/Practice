"use client"

import { fetchOrder } from "@/app/store/orderSlice";
import { Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import OrderField from "./order-field";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useRouter } from "next/navigation";

const OrderDetail = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    console.log("OrderDetailed called ", props.orderId);
    const [order, setOrder] = useState(false);
    
    console.log(order);
    useEffect(() => {
        async function fetchAndSetOrder() {
            const fetchedOrderResponse = await dispatch(fetchOrder({ orderId: props.orderId }));
            setOrder(fetchedOrderResponse.payload);
        }
        fetchAndSetOrder();

    }, []);

    const handleToProduct = (itemId) => {
        router.push(`/product/${itemId}`);
    }

    return (
        <>
            {
                order ?
                    <>
                        <div className="d-flex justify-content-center align-items-center m-auto product-container">
                            <Box sx={{ flexGrow: 1,  }}  >
                                <Grid container direction="row"
                                    spacing={{ xs: 2, md: 3 }} xs={12} sm={12} md={12} lg={12} xl={12}>

                                    <Grid item container direction="column"
                                        xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <OrderField title={"Order Id"} value={order.orderId} />
                                        <OrderField title={"Order Date"} value={order.orderDate} />
                                        <OrderField title={"Buyer Name"} value={order.buyerName} />
                                        <OrderField title={"Contact No."} value={order.contactNo} />
                                        <OrderField title={"Address"} value={order.address} />
                                        <OrderField title={"Total Price"} value={order.amount} />
                                        <OrderField title={"Shipping Method"} value={order.shippingMethod} />
                                    </Grid>

                                    <Grid item direction="row"
                                        justifyContent="space-evenly"
                                        alignItems="center" spacing={{ xs: 2, md: 3 }} xs={12} sm={12} md={6} lg={6} xl={6} >
                                        <List sx={{ width: '100%' }} key={1}>
                                            {order.orderedItems.map((item) => {
                                                const labelId = `checkbox-list-label-${item.itemId}`;
                                                return (
                                                    <>
                                                        <ListItem className="hover"
                                                            key={item.itemId}
                                                            disablePadding
                                                        >
                                                            <ListItemButton role={undefined} dense onClick={() => handleToProduct(item.itemId)}>
                                                                <ListItemAvatar>
                                                                    <Avatar
                                                                        alt={item.title}
                                                                        src={item.image}
                                                                    />
                                                                </ListItemAvatar>

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
                                                                                <strong className="mx-3">{item.qty}</strong>
                                                                                x
                                                                                <strong className="mx-3">{item.price}</strong>
                                                                                =
                                                                                <CurrencyRupeeIcon className="ms-3" fontSize="inherit" /><strong> {item.totalPrice}/- </strong>
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

export default OrderDetail;
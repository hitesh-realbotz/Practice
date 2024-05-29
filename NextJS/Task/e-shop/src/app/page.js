"use client"
import { Grid } from "@mui/material";
import Cart from "./component/cart";
import ProductList from "./component/products/products";
import { useSelector } from "react-redux";

export default function Home() {

  const isUser = useSelector((data) => data.usersData.isLoggedIn);

  return (
    <>
      {
        isUser
          ?
          <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
              <Grid item xs={12} sm={12} md={7} lg={8} >
                <ProductList />
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={4} >
                <Cart />
              </Grid>
            </Grid>
          </>
          :
          <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} >
                <ProductList />
              </Grid>
            </Grid>
          </>
      }


    </>
  );
}

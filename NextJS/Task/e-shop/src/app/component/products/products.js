"use client"
import { useDispatch, useSelector } from "react-redux";
import PaginationButtons from "../pagination-buttons";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getProducts } from "@/app/store/productSlice";
import { ITEMS_PER_PAGE } from "@/config/constants";


const ProductList = () => {

    const dispatch = useDispatch();

    const products = useSelector((state) => state.productsData.products);

    const [pageProps, setPageProps] = useState({pageProducts: [], page:1});

    const getPaginatedData = (value) => {
       
        console.log("Page ", value);
        setPageProps(prevPageProps => {
           
            const page = value;
            const startIndex = 0 + ((value - 1) * ITEMS_PER_PAGE);
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const pageProductss = products.slice(startIndex, endIndex);
            return { ...prevPageProps, pageProducts: pageProductss, page: value };
        });
    };
    


    console.log(products);
    useEffect(() => {
        async function fetchAndSetPageProducts(){
            if (!products.length) {
                await dispatch(getProducts());
                getPaginatedData(1)
            }
        }
        fetchAndSetPageProducts();
        
    }, []);

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <PaginationButtons count={15}  page={pageProps.page} onChange={(value) => getPaginatedData(value)} />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            pageProps.pageProducts.length && pageProps.pageProducts.map((item) => (
                                <Grid justifyContent="center"
                                    alignItems="center" item xs={2} sm={4} md={3} key={item.id}>
                                    {/* <ProductCard key={product.id} item={product} /> */}
                                    <Card className="product-card" >
                                        <CardMedia
                                            sx={{ height: 200, width: 200 }}
                                            image={item.image}
                                            title={item.title}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.title}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Share</Button>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </div>

        </>
    );
}
export default ProductList;


import { Card, CardContent, Grid, Typography } from "@mui/material";

const DashboardField = (props) => {
    const {title, value, handleToRoute} = props;
    console.log("Dash ", title, value);
    return (
        <>
            <Grid justifyContent="center"
                alignItems="center" item xs={12} sm={6} md={6} lg={6} xl={4} key={`${title}${value}`}>
                <div onClick={handleToRoute}>
                    <Card className="product-card" >

                        <CardContent className="d-flex flex-column justify-content-center align-items-center">
                            <Typography gutterBottom variant="h5" component="div">
                                {title}
                            </Typography>
                            <Typography variant="p" component="div" color="text.secondary">
                                {value}
                            </Typography>
                        </CardContent>
                        
                    </Card>
                </div>
            </Grid>

        </>
    );

}
export default DashboardField;
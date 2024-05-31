import { Padding } from "@mui/icons-material";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const OrderField = (props) => {
    return (
        <List key={props.value} xs={12} sm={6} md={4} lg={2} xl={2} disablePadding >
            <ListItem
                key={props.value}
                disablePadding
            >
                <ListItemText
                    primary={`${props.title} :`}
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
                                <strong className="">{props.value}</strong>
                            </Typography>


                        </>
                    }
                />
            </ListItem>
        </List>

    );
}
export default OrderField;
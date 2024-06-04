import { Typography } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


const ProductField = (props) => {
    return (
        <>
            <Typography 
                sx={{ display: 'inline' }}
                component="span"
                variant="p"
                color="text.primary"
                fontWeight="medium"
                fontSize={18}
            >
                <strong className="">{`${props.title} : `}</strong>

            </Typography>
            <Typography className="mb-2"
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

    );
}
export const InlineProductField = (props) => {
    return (
        <>
            <Typography className="mb-2"
                sx={{ display: 'inline' }}
                component="span"
                variant="p"
                color="text.primary"
                fontWeight="medium"
                fontSize={18}
            >
                <strong className="">{`${props.title} : `}</strong>
                <Typography 
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="p"
                    color="text.secondary"
                    fontWeight="medium"
                    fontSize={18}
                >
                    {
                        props.title == "Price"
                            ? <>
                                <CurrencyRupeeIcon className="" fontSize="inherit" /><strong className="">{props.value} /-</strong>
                            </>
                            : <strong className="">{props.value}</strong>
                    }
                </Typography>
            </Typography>


        </>

    );
}
export default ProductField;
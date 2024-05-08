import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../constants/constants";
import { NotFoundTab } from "./not-found.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const NotFound = () => {
    const navigate = useNavigate();
    const handelClick = () => {
        navigate(CONSTANTS.HOME_ROUTE_PATH);
    }

    return (
        <>
            <NotFoundTab>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <p>Please check the URL for any mistakes, or click the button below to go back to the homepage.</p>
                <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={() => handelClick()}>Go to Homepage</Button>
            </NotFoundTab>
        </>
    )
}
export default NotFound;
import { CONSTANTS } from "../../constants/constants";

export const getStoredRoute = () => {
    return sessionStorage.getItem(CONSTANTS.STORED_ROUTE_KEY_NAME);
}

export const setStoredRoute = () => {
    sessionStorage.setItem(CONSTANTS.STORED_ROUTE_KEY_NAME, window.location.pathname);
}
// export const setStoredRoute = (name) => {   
//     sessionStorage.setItem(CONSTANTS.STORED_ROUTE_KEY_NAME, name);
// }
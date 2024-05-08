import { CONSTANTS } from "../../constants/constants";

export const getStoredRoute = () => {
    return sessionStorage.getItem(CONSTANTS.STORED_ROUTE_KEY_NAME);
}

export const setStoredRoute = (route) => {
    sessionStorage.setItem(CONSTANTS.STORED_ROUTE_KEY_NAME, route ? route : window.location.pathname);
}
// export const setStoredRoute = (name) => {   
//     sessionStorage.setItem(CONSTANTS.STORED_ROUTE_KEY_NAME, name);
// }
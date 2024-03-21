import { Cart } from "./cart";
import { Photo } from "./photo";

export interface User {
    name: string;
    email: string;
    token: string;
    photoUrl: string;
    gender: string;
    city: string;
    country: string;
    twoFactorEnabled: boolean;
    photos: Photo[];
    cart: Cart;
    
}

export interface UserWithQRData{
    userProfile: User;
    qRData: QRData;
}
export interface QRData{
    sharedKey: string;
    authenticatorUri: string;
}
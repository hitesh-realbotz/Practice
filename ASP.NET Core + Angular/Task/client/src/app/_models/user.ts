import { Photo } from "./photo";

export interface User {
    name: string;
    email: string;
    token: string;
    gender: string;
    city: string;
    country: string;
    twoFactorEnabled: boolean;
    photos: Photo[];

}
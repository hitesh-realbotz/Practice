import { Photo } from "./photo";

export interface Book {
    title: string;
    author: string;
    isbn: string;
    photoUrl: string;
    price: number;
    quantity: number;
    availableQuantity: number;
    description: string;
    photos: Photo[];
}
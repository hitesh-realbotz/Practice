import { Book } from "./book";

export class CartItem {
  public book: Book;
  public quantity: number;
  public checked: boolean;
  public totalPrice: number;
  
  constructor(book: Book, quantity: number, totalPrice: number, checked: boolean) {
    this.book = book;
    this.quantity = quantity;
    this.checked = checked;
    this.totalPrice = totalPrice;
  }
}
import { Book } from "./book";

export class CartItem {
  public book: Book;
  public qty: number;
  public checked: boolean;
  public totalPrice: number;
  
  constructor(book: Book, qty: number, totalPrice: number, checked: boolean) {
    this.book = book;
    this.qty = qty;
    this.checked = checked;
    this.totalPrice = totalPrice;
  }
}
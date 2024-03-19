import { Book } from "./book";

export class CartItem {
    public book: Book | undefined;
    public qty: number;
    public checked: boolean;
    
    constructor(item: Book, qty: number, checked: boolean) {
      this.book = item;
      this.qty = qty;
      this.checked = checked;
    }
  }
import { Item } from "../item.model";

export class CartItem {
  public item: Item;
  public qty: number;
  public checked: boolean;
  
  constructor(item: Item, qty: number, checked: boolean) {
    this.item = item;
    this.qty = qty;
    this.checked = checked;
  }
}

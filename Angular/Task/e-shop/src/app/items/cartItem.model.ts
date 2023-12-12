import { Item } from "./item.model";

export class CartItem {
  public checked: boolean;
  public item: Item;
  public qty: number;

  constructor(item: Item, qty: number) {
    // this.ItemId = ItemId;
    // this.qty = qty;
    this.checked = true;
    this.item = item;
    this.qty = qty;
  }
}

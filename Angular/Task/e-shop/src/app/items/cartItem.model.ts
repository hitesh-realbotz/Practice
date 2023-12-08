export class CartItem {
    public ItemId: number;
    public qty: number;
  
    constructor(ItemId: number, qty: number) {
      this.ItemId = ItemId;
      this.qty = qty;
    }
  }
  
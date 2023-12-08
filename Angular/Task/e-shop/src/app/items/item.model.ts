export class Item {
  public name: string;
  public itemId: number | null;
  public sellerId: string | null;
  public image: string;
  public description: string;
  public category: string;
  public price: number;
  public qty: number;
  public availableQty: number;


  constructor(
    name: string,
    image: string,
    description: string,
    category: string,
    price: number,
    qty: number,
    itemId?: number,
    sellerId?: string,

  ) {
    this.name = name;
    this.image = image;
    this.description = description;
    this.category = category;

    this.price = price;
    this.qty = qty;
    this.itemId = itemId || 0;
    this.sellerId = sellerId || '';
    this.availableQty = qty;
  }
}


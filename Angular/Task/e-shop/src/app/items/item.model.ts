export class Item{
    public name: string;
    public itemId: string;
    public sellerId: string;
    public image: string;
    public description: string;
    public category: string;
    
  
    constructor(
      name: string,
      itemId: string,
      sellerId: string,
      image: string,
      description: string,
      category: string
    ) {
        this.name = name;
        this.itemId = itemId;
        this.sellerId = sellerId;
        this.image = image;
        this.description = description;
        this.category = category;
    }
}
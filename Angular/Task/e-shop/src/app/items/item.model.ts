export class Item{
    public name: string;
    public itemId: number | null;
    public sellerId: string | null;
    public image: string;
    public description: string;
    public category: string;
    
  
    constructor(
      name: string,
      image: string,
      description: string,
      category: string,
      itemId?: number,
      sellerId?: string,
    ) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.category = category;
        this.itemId = itemId || 0 ;
        this.sellerId = sellerId || '';
    }
}

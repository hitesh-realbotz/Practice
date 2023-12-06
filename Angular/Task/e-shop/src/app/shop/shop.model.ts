export class Shop{
    public shopName: string;
    public shopAddress: string;
    public shopIntro: string;
    public shopImage: string;
  
    constructor(name: string, address: string, shopIntro: string, image: string) {
      this.shopName = name;
      this.shopAddress = address;
      this.shopIntro = shopIntro;
      this.shopImage = image;
    }
}
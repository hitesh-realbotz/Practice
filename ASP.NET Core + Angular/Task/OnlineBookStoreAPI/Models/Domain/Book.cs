namespace OnlineBookStoreAPI.Models.Domain
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string ISBN { get; set; }
        public double UnitPrice { get; set; }
        public int Quantity { get; set; }
        public int AvailableQuantity { get; set; }
        public string Description { get; set; }
        public List<Photo> Photos { get; set; }

        public List<OrderBook> OrderBooks { get; set; }
        public List<CartItem> CartItems { get; set; }

    }
}

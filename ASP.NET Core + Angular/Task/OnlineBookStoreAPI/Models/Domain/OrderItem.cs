namespace OnlineBookStoreAPI.Models.Domain
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
        public Book Book { get; set; }
    }
}

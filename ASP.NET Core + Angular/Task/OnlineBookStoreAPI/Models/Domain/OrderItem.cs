namespace OnlineBookStoreAPI.Models.Domain
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
        public int OrderId { get; set; }
        public int OrderBookId { get; set; }
        public OrderBook OrderBook { get; set; }
       
    }
}

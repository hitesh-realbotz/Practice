namespace OnlineBookStoreAPI.Models.DTOs
{
    public class OrderItemDto
    {
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
        public double TotalPrice { get; set; }
        public string PhotoUrl { get; set; }
        public OrderBookDto OrderBook { get; set; }
    }
}

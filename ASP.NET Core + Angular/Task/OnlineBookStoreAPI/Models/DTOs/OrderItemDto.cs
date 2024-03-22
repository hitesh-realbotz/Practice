namespace OnlineBookStoreAPI.Models.DTOs
{
    public class OrderItemDto
    {
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
        public OrderBookDto OrderBook { get; set; }
    }
}

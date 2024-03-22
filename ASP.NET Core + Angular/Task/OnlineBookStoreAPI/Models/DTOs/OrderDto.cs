using OnlineBookStoreAPI.Models.Domain;

namespace OnlineBookStoreAPI.Models.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; } = 0;
        public string BillingName { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public string ShippingMethod { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public double TotalPrice { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
    }
}

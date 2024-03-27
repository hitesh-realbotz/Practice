namespace OnlineBookStoreAPI.Models.Domain
{
    public class Order
    {
        public int Id { get; set; }
        public string BillingName { get; set; }
        public string Address { get; set; }
        public string ContactNo { get; set; }
        public string ShippingMethod { get; set; }
        public double TotalPrice { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}

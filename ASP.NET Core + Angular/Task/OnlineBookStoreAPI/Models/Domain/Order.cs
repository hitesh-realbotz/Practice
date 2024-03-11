namespace OnlineBookStoreAPI.Models.Domain
{
    public class Order
    {
        public int Id { get; set; }
        public string BillingName { get; set; }
        public string Address { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public double TotalPrice { get; set; }
        public AppUser AppUser { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}

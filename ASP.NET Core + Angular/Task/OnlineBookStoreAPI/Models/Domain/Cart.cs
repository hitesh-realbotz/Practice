namespace OnlineBookStoreAPI.Models.Domain
{
    public class Cart
    {
        public int Id { get; set; }
        
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public List<CartItem> CartItems { get; set; }

    }
}

namespace OnlineBookStoreAPI.Models.Domain
{
    public class CartItem
    {
        public int Id { get; set; }
        public bool Checked { get; set; }
        public int Quantity { get; set; }
        //public double TotalPrice { get; set; }
        public Cart Cart { get; set; }
        public Book Book { get; set; }
    }
}

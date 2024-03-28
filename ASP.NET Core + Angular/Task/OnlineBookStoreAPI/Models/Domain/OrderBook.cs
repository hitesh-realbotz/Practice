namespace OnlineBookStoreAPI.Models.Domain
{
    public class OrderBook
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string ISBN { get; set; }     
        public string Description { get; set; }
        //public List<Photo> Photos { get; set; }
        public List<OrderItem> OrderItems { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }

    }
}

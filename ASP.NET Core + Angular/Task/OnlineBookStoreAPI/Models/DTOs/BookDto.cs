using OnlineBookStoreAPI.Models.Domain;

namespace OnlineBookStoreAPI.Models.DTOs
{
    public class BookDto
    {
          public string Author { get; set; }
      public string Title { get; set; }
        public string ISBN { get; set; }
        public double UnitPrice { get; set; }
        public int Quantity { get; set; }
        public int AvailableQuantity { get; set; }
        public string Description { get; set; }
        public List<PhotoDto> Photos { get; set; }
        public string PhotoUrl { get; set; }
    }
}

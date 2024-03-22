using OnlineBookStoreAPI.Models.Domain;

namespace OnlineBookStoreAPI.Models.DTOs
{
    public class OrderBookDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string ISBN { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public List<PhotoDto> Photos { get; set; }
        public string PhotoUrl { get; set; }
    }
}

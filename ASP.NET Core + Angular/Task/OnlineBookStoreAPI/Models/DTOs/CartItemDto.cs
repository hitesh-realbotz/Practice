using OnlineBookStoreAPI.Models.Domain;

namespace OnlineBookStoreAPI.Models.DTOs
{
    public class CartItemDto
    {
        public bool Checked { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
        public BookDto Book { get; set; }
    }
}

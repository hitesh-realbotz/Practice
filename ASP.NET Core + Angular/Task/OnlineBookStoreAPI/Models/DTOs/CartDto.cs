using OnlineBookStoreAPI.Models.Domain;

namespace OnlineBookStoreAPI.Models.DTOs
{
    public class CartDto
    {
        public double TotalPrice { get; set; }
        public double TotalCheckedPrice { get; set; }
        public List<CartItemDto> CartItems { get; set; }
    }
}

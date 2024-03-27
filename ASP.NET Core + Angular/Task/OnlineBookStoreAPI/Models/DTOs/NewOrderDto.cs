using System.ComponentModel.DataAnnotations;

namespace OnlineBookStoreAPI.Models.DTOs
{
    public class NewOrderDto
    {
        [Required]
        public string BillingName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string ContactNo { get; set; }
        [Required]
        public string ShippingMethod { get; set; }
        [Required]
        public DateTime Date { get; set; } = DateTime.Now;
        [Required]
        public double TotalPrice { get; set; }
        [Required]
        public string Pin { get; set; }

    }
}

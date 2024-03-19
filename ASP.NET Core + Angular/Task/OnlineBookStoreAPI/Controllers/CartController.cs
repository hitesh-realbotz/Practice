using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Services.Interfaces;

namespace OnlineBookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService cartService;
       

        public CartController(ICartService cartService)
        {
            this.cartService = cartService;
           
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CartDto>> AddToCart(CartItemDto cartItemDto)
        {
            return Ok(await cartService.AddToCartAsync(cartItemDto));
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<CartDto>> GetUserCart()
        {
            return Ok(await cartService.GetUserCartAsync());
        }

        [HttpDelete]
        [Authorize]
        public async Task<ActionResult<bool>> ClearCart()
        {
            return Ok(await cartService.ClearCartAsync());
        }
    }
}

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

        //Add item to cart &/ increases cart item quantity
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CartDto>> AddToCart(CartItemDto cartItemDto)
        {
            return Ok(await cartService.AddToCartAsync(cartItemDto));
        }

        //Remove item from cart &/ decreases cart item quantity
        [HttpPost("decrease-qty")]
        [Authorize]
        public async Task<ActionResult<CartDto>> DecreaseCartItemQty(CartItemDto cartItemDto)
        {
            return Ok(await cartService.DecreaseCartItemQtyAsync(cartItemDto));
        }

        //Toggles cart item checked status
        [HttpPost("toggle-check")]
        [Authorize]
        public async Task<ActionResult<CartDto>> ToggleCheckCartItem(CartItemDto cartItemDto)
        {
            return Ok(await cartService.ToggleCheckCartItemAsync(cartItemDto));
        }


        //Gets user cart
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<CartDto?>> GetUserCart()
        {
            return Ok(await cartService.GetUserCartAsync());
        }


        //Clears cart
        [HttpDelete]
        [Authorize]
        public async Task<ActionResult<bool>> ClearCart()
        {
            return Ok(await cartService.ClearCartAsync());
        }
    }
}

using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Repositories.Interfaces;
using OnlineBookStoreAPI.Services.Interfaces;
using System.Security.Claims;
using System.Text.Json;

namespace OnlineBookStoreAPI.Services
{
    public class CartService : ICartService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        public CartService(IUnitOfWork uow, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            this.uow = uow;
            this.mapper = mapper;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task<CartDto> AddToCartAsync(CartItemDto cartItemDto)
        {
            var cartItem = mapper.Map<CartItem>(cartItemDto);
            await uow.BeginTransaction();
            var book = await BookExists(cartItem.Book);
            if (book.AvailableQuantity == 0) throw new BadHttpRequestException($"Book is Out-Of-Stock!!");

            var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid).Value.ToString();

            Cart userCart = await uow.CartRepository.GetByUserId(userId);

            if (userCart == null)
            {
                userCart = new Cart
                {
                    AppUserId = userId,
                    CartItems = new List<CartItem> { new CartItem
                    {
                        Checked = cartItem.Checked,
                        Quantity = cartItem.Quantity,
                        CartId = cartItem.Id,
                        BookId = book.Id,
                    }
            }
                };
                userCart = await uow.CartRepository.CreateAsync(userCart);
                book.AvailableQuantity--;
            }
            else
            {
                foreach (var item in userCart.CartItems)
                {
                    if (item.BookId == book.Id)
                    {
                        item.Quantity++;
                        book.AvailableQuantity--;
                    }
                }
            }


            if (await uow.Commit())
            {
                return mapper.Map<CartDto>(userCart);
            }
            throw new BadHttpRequestException("Problem adding book in Cart!");

        }

        public async Task<bool> ClearCartAsync()
        {
            var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid).Value.ToString();

            Cart userCart = await uow.CartRepository.GetByUserId(userId);
            if (userCart == null) throw new Exception("Cart is already blank!");

            var isCleared = await uow.CartRepository.ClearCartAsync(userCart);
            if (isCleared) return isCleared;

            throw new BadHttpRequestException("Problem in deleting cart!");

        }



    

        public async Task<CartDto> GetUserCartAsync()
        {
            var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid).Value.ToString();
            Cart userCart = await uow.CartRepository.GetByUserId(userId);
            if (userCart == null) throw new Exception("Cart is blank!");
            return mapper.Map<CartDto>(userCart);
        }

        private async Task<Book> BookExists(Book book)
        {
            var existingBook = await uow.BookRepository.GetByISBNAsync(book.ISBN);
            if (existingBook == null) throw new BadHttpRequestException($"Book with {book.Title} title not found!");
            return existingBook;
        }

       
    }
}



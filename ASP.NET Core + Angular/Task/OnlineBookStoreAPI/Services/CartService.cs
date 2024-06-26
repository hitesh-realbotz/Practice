﻿using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Repositories.Interfaces;
using OnlineBookStoreAPI.Services.Interfaces;
using System.Security.Claims;

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


        //Add item to cart &/ increases cart item quantity
        public async Task<CartDto> AddToCartAsync(CartItemDto cartItemDto)
        {
            var cartItem = mapper.Map<CartItem>(cartItemDto);
            await uow.BeginTransaction();
            var book = await BookExists(cartItem.Book);
            if (book.AvailableQuantity < cartItem.Quantity) throw new BadHttpRequestException($"Book's available qty is less than required quantity!!");

            var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid).Value.ToString();

            Cart cart = await uow.CartRepository.GetByUserId(userId);

            if (cart == null)
            {
                //Creates cart & add item to cart if cart is null
                cart = new Cart
                {
                    AppUserId = userId,
                    CartItems = new List<CartItem> { GenerateCartItem(cartItem, book) }
                };
                cart = await uow.CartRepository.CreateAsync(cart);
            }
            else
            {
                //Add item to cart if cart is not null
                bool isCartItem = false;
                foreach (var item in cart.CartItems)
                {
                    //Increases cart item quantity if item already present based on available quantity
                    if (item.BookId == book.Id)
                    {
                        _ = (book.AvailableQuantity > item.Quantity) ? item.Quantity++ : throw new BadHttpRequestException($"Book's available qty is less than required quantity!!"); ;
                        isCartItem = true;
                    }
                }
                if (!isCartItem)
                {
                    cart.CartItems.Add(GenerateCartItem(cartItem, book));
                }
            }
            if (await uow.Commit())
            {
                return mapper.Map<CartDto>(cart);
            }
            throw new BadHttpRequestException("Problem adding book in Cart!");
        }

        //Generates cart item
        private static CartItem GenerateCartItem(CartItem cartItem, Book book)
        {
            return new CartItem
            {
                Checked = cartItem.Checked,
                Quantity = cartItem.Quantity,
                CartId = cartItem.Id,
                BookId = book.Id,
            };
        }

        //Decreases cart item quantity
        public async Task<CartDto> DecreaseCartItemQtyAsync(CartItemDto cartItemDto)
        {
            var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid).Value.ToString();
            await uow.BeginTransaction();
            Cart cart = await uow.CartRepository.GetByUserId(userId);
            if (cart == null) throw new BadHttpRequestException("Cart is blank!");
            var cartItem = mapper.Map<CartItem>(cartItemDto);
            var book = await BookExists(cartItem.Book);
            bool isCartItem = false;

            foreach (var item in cart.CartItems)
            {
                if (item.BookId == book.Id)
                {
                    if (item.Quantity == 1)
                    {
                        if (cart.CartItems.Count == 1)
                        {
                            //Clears entire cart if cart contains single item & item quantity == 1
                            if (await uow.CartRepository.ClearCartAsync(cart)) cart = null;
                        }
                        //Removes item from cart if quantity == 1
                        else await uow.CartItemRepository.RemoveCartItemAsync(item);
                    }
                    else item.Quantity--;
                    isCartItem = true;
                    break;
                }
            }
            if (!isCartItem) throw new BadHttpRequestException($"Book with {book.Title} title not Found in Cart.");
            if (await uow.Commit()) return mapper.Map<CartDto>(cart);
            throw new BadHttpRequestException("Problem in reducing book quantity in Cart!");
        }

        //Toggles cart item checked status
        public async Task<CartDto> ToggleCheckCartItemAsync(CartItemDto cartItemDto)
        {
            var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid).Value.ToString();
            await uow.BeginTransaction();
            Cart cart = await uow.CartRepository.GetByUserId(userId);
            if (cart == null) throw new BadHttpRequestException("Cart is blank!");
            var cartItem = mapper.Map<CartItem>(cartItemDto);
            var book = await BookExists(cartItem.Book);
            bool isCartItem = false;
            foreach (var item in cart.CartItems)
            {
                if (item.BookId == book.Id)
                {
                    item.Checked = !item.Checked;
                    isCartItem = true;
                    break;
                }
            }
            if (!isCartItem) throw new BadHttpRequestException($"Book with {book.Title} title not Found in Cart.");
            if (await uow.Commit()) return mapper.Map<CartDto>(cart);
            throw new BadHttpRequestException("Problem in reducing book quantity in Cart!");
        }

        //Clears entire cart
        public async Task<bool> ClearCartAsync()
        {
            var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid).Value.ToString();

            Cart cart = await uow.CartRepository.GetByUserId(userId);
            if (cart == null) throw new BadHttpRequestException("Cart is already blank!");

            var isCleared = await uow.CartRepository.ClearCartAsync(cart);
            if (isCleared) return isCleared;

            throw new BadHttpRequestException("Problem in deleting cart!");

        }


        //Gets user cart
        public async Task<CartDto?> GetUserCartAsync()
        {
            var userId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid).Value.ToString();
            Cart cart = await uow.CartRepository.GetByUserId(userId);
            if (cart == null) throw new BadHttpRequestException("");
            return mapper.Map<CartDto>(cart);
        }


        //Gets book if exists
        private async Task<Book> BookExists(Book book)
        {
            var existingBook = await uow.BookRepository.GetByISBNAsync(book.ISBN);
            if (existingBook == null) throw new BadHttpRequestException($"Book with {book.Title} title not found!");
            return existingBook;
        }


    }
}



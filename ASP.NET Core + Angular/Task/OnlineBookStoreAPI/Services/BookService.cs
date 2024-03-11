﻿using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OnlineBookStoreAPI.Models.Domain;
using OnlineBookStoreAPI.Models.DTOs;
using OnlineBookStoreAPI.Repositories.Interfaces;
using OnlineBookStoreAPI.Services.Interfaces;

namespace OnlineBookStoreAPI.Services
{
    public class BookService : IBookService
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;

        public BookService(IUnitOfWork uow, IMapper mapper, IPhotoService photoService)
        {
            this.uow = uow;
            this.mapper = mapper;
            this.photoService = photoService;
        }

        public async Task<BookDto> CreateAsync(BookDto bookDto)
        {
            var book = mapper.Map<Book>(bookDto);
            book = await uow.BookRepository.CreateAsync(book);
            return mapper.Map<BookDto>(book);
        }

        public async Task<List<BookDto?>> AddPhotoAsync(List<IFormFile> files)
        {
            List<BookDto> bookDtoList = new List<BookDto>();
            foreach (var file in files)
            {
                var result = await photoService.AddPhotoAsync(file);

                if (result.Error != null) continue;

                var photo = new Photo
                {
                    Url = result.SecureUrl.AbsoluteUri,
                    PublicId = result.PublicId,
                    IsMain = true
                };

                var fileName = file.FileName.Substring(0, file.FileName.LastIndexOf('.'));
                var book = await uow.BookRepository.GetByTitleAsync(fileName);
                if (book == null) continue;

                book.Photos.Add(photo);

                if (await uow.SaveChangesAsync())
                    bookDtoList.Add(mapper.Map<BookDto>(book));
            }

            return bookDtoList;


        }
    }
}

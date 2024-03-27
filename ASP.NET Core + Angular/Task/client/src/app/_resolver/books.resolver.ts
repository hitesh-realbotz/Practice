import { ResolveFn } from '@angular/router';
import { BookService } from '../_services/book.service';
import { inject } from '@angular/core';
import { Book } from '../_models/book';
import { Observable, catchError, tap } from 'rxjs';
import { PaginatedResult } from '../_models/Helpers/pagination';

export const booksResolver: ResolveFn<boolean | PaginatedResult<Book[]> | Observable<PaginatedResult<Book[]>> | Promise<PaginatedResult<Book[]>>> = (route, state) => {
  const bookService = inject(BookService);
    
  return bookService.getBooks(bookService.getBookParams())
  .pipe( tap (
    response => {
         console.log('bookResolver data fetched');
        if (response.result && response.pagination) {
          bookService.pagination = response.pagination;
          bookService.setBooks(response.result);
        }
      }
    )
    )
};

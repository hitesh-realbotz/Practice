import { ResolveFn } from '@angular/router';
import { BookService } from '../_services/book.service';
import { inject } from '@angular/core';
import { Book } from '../_models/book';
import { Observable, tap } from 'rxjs';

export const booksResolverResolver: ResolveFn<boolean | Book[] | Observable<Book[]> | Promise<Book[]>> = (route, state) => {
  const bookService = inject(BookService);

  bookService.getBooks(bookService.getBookParams())
    .subscribe({
      next: response => {
        if (response.result && response.pagination) {
          bookService.pagination = response.pagination;
          bookService.setBooks(response.result);
        }
        return true;
      }
    });
  return true;


};

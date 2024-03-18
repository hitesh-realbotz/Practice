import { ResolveFn } from '@angular/router';
import { BookService } from '../_services/book.service';
import { inject } from '@angular/core';

export const booksResolverResolver: ResolveFn<boolean> = (route, state) => {
  const bookService = inject(BookService);

  return true;
};

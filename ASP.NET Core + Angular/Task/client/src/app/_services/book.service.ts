import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../_models/book';
import { Subject, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BookParams } from '../_models/bookParamas';
import { getPaginatedResult, getPaginationHeaders } from '../_models/Helpers/paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = environment.apiUrl;

  books: Book[] = [];
  bookChanged = new Subject<Book[]>();
  bookParams: BookParams = new BookParams();

  constructor(private http: HttpClient, private toastr: ToastrService) { }


  getBookParams() {
    return this.bookParams;
  }

  setBookParams(bookParams: BookParams) {
    this.bookParams = bookParams;
  }

  resetBookParams() {
    this.bookParams = new BookParams();
    return this.bookParams;
  }


  getBooks(bookParamas: BookParams) {
    let params = getPaginationHeaders(this.bookParams.pageNumber, this.bookParams.pageSize);

    params = params.append('MinPrice', this.bookParams.minPrice);
    params = params.append('MaxPrice', this.bookParams.maxPrice);
    params = params.append('SortBy', this.bookParams.sortBy);
    params = params.append('SortOrder', this.bookParams.sortOrder);

    return getPaginatedResult<Book[]>(this.baseUrl + 'books', params, this.http);
  }

  setBooks(books: Book[]) {
    this.books = books;
    this.bookChanged.next(this.books);
  }

}

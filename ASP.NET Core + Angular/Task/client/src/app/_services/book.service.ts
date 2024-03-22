import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../_models/book';
import { BehaviorSubject, tap } from 'rxjs';
import { BookParams } from '../_models/bookParamas';
import { getPaginatedResult, getPaginationHeaders } from '../_models/Helpers/paginationHelper';
import { Pagination } from '../_models/Helpers/pagination';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = environment.apiUrl;

  books: Book[] = [];
  // bookChanged = new Subject<Book[]>();
  bookChanged = new BehaviorSubject<Book[] | null>(null);
  bookParams: BookParams = new BookParams();
  pagination: Pagination | undefined;

  constructor(private http: HttpClient) { }


  getBookParams() {
    return this.bookParams;
  }

  setBookParams(bookParams: BookParams) {
    this.bookParams = bookParams;
  }

  public getBookIndexByISBN(isbn: string) {
    return this.books.findIndex(book => book.isbn === isbn);
  }
  public getBookByISBN(isbn: string) {
    return this.books.find(b => b.isbn === isbn);
  }

  resetBookParams() {
    this.bookParams = new BookParams();
    return true;
  }


  getBooks(bookParamas: BookParams) {
    let params = getPaginationHeaders(this.bookParams.pageNumber, this.bookParams.pageSize);
    params = params.append('MinPrice', this.bookParams.minPrice);
    params = params.append('MaxPrice', this.bookParams.maxPrice);
    params = params.append('SortBy', this.bookParams.sortBy);
    params = params.append('SortOrder', this.bookParams.sortOrder);

    return getPaginatedResult<Book[]>(this.baseUrl + 'books', params, this.http);
  }

  getBook(isbn: string) {
    
      return this.http.get<Book>(this.baseUrl + 'books/' + isbn)
        .pipe(
          tap(response => {
            if (response) {   
                let index = this.getBookIndexByISBN(isbn);
                this.books[index] = response;
                this.setBooks(this.books);       
            }
          })
        );
  }

  setBooks(books: Book[]) {
    this.books = books;
    this.bookChanged.next(this.books);
  }

}

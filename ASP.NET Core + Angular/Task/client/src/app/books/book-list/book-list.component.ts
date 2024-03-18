import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pagination } from 'src/app/_models/Helpers/pagination';
import { Book } from 'src/app/_models/book';
import { BookParams } from 'src/app/_models/bookParamas';
import { Constants } from 'src/app/_models/constants';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  bookParms: BookParams | undefined;
  pagination: Pagination | undefined;
  sortForm: FormGroup = new FormGroup({});
  sortByOptions: string[] = [Constants.sortByTitle, Constants.sortByPrice, Constants.sortByAuthor];
  sortOrderOptions: string[] = [Constants.sortOrderAsc, Constants.sortOrderDsc];
  // currentPage: number = 1;

  constructor(private bookService: BookService, private fb: FormBuilder, private ngZone: NgZone) {
    this.bookParms = this.bookService.getBookParams();
  }

  ngOnInit(): void {
    this.sortForm = this.fb.group({
      sortBy: [this.bookParms?.sortBy, [Validators.required]],
      sortOrder: [this.bookParms?.sortOrder, [Validators.required]],
      minPrice: [this.bookParms?.minPrice, [Validators.required]],
      maxPrice: [this.bookParms?.maxPrice, [Validators.required]],


    });
    this.loadBooks();
  }

  loadBooks() {
    if (this.bookParms) {
      this.bookService.getBooks(this.bookParms).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.bookService.setBooks(response.result);
            this.books = response.result;
            this.pagination = response.pagination;
          }
        }
      });
    }
  }

  //To mark All form controls as Touched to display Validation messages on-submit button clicked
  markAllAsTouched() {
    this.ngZone.runOutsideAngular(() => {
      Object.values(this.sortForm.controls).forEach(control => {
        control.markAsTouched();
      });
    });
  }
  onSubmitProfile(event: Event) {
    if (this.sortForm.valid) {
      let value = this.sortForm.value;
      const bP = new BookParams(value.sortBy, value.sortOrder, value.minPrice, value.maxPrice, value.pageNumber, value.pageSize);

      this.bookService.setBookParams(bP);
      this.bookParms = this.bookService.getBookParams();
      this.loadBooks();

    } else {
      event.stopPropagation();
      this.markAllAsTouched();
    }

  }

  resetFilters() {
    this.bookParms = this.bookService.resetBookParams();
    this.loadBooks();
  }

  pageChanged(event: any) {
    if (this.bookParms && this.bookParms?.pageNumber !== event.page) {
      this.bookService.setBookParams(this.bookParms);
      this.bookParms.pageNumber = event.page;
      this.loadBooks();
    }
  }

}

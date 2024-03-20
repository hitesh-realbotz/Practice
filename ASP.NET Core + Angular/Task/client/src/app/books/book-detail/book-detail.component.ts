import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/_models/book';
import { AccountService } from 'src/app/_services/account.service';
import { BookService } from 'src/app/_services/book.service';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  index: string = '';
  book: Book | undefined;
  constructor(private route: ActivatedRoute,
    private router: Router, private bookService: BookService, private toastr: ToastrService, private accountService: AccountService, private cartService: CartService) { }

  ngOnInit(): void {
    const bk = this.bookService.books;
    this.route.params.subscribe(
      (params: Params) => {
        this.index = params['id'];

        // if (this.index >= 0) {
          this.bookService.getBook(this.index)?.subscribe({
            next: book => {
              this.book = book;
            },
            error: error => {              
              this.toastr.info("Try again!", error.error.message);
              this.router.navigate(['/book']);
            }
         });
        // }

      });
  }

  //OnClick AddToCart Item
  onAddToCart(event: Event, book: Book) {
    event.stopPropagation();
    if (book.availableQuantity >= 1) {
      this.cartService.addToCartFromItem(book).subscribe({
        next: response => {
          this.toastr.success("Book added in cart!");
        },
        error: error => {
          this.toastr.warning(error.error.message);
        }
      });
    } else {
      this.toastr.info("Selected book is out of stock!");
    }
  }

}

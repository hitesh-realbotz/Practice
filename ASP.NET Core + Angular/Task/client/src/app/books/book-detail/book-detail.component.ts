import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/_models/book';
import { AccountService } from 'src/app/_services/account.service';
import { BookService } from 'src/app/_services/book.service';
import { CartService } from 'src/app/_services/cart.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy {

  index: string = '';
  book: Book | undefined;
  componentSubscriptions = new Subscription();

  constructor(private route: ActivatedRoute,

    private router: Router, private bookService: BookService, private toastr: ToastrService, private accountService: AccountService, private cartService: CartService, private subService: SubscriptionsService) { }

  ngOnInit(): void {
    const bk = this.bookService.books;
    this.componentSubscriptions.add(this.route.params.subscribe(
      (params: Params) => {
        this.index = params['id'];

        // if (this.index >= 0) {
        this.bookService.getBook(this.index)?.subscribe({
          next: book => {
            this.book = book;
          },
          error: error => {
            this.router.navigate(['/book']);
          }
        });
      }));
  }

  //OnClick AddToCart Item
  onAddToCart(event: Event, book: Book) {
    event.stopPropagation();
    if (book.availableQuantity >= 1) {
      this.cartService.addToCartFromItem(book).subscribe({
        next: response => {
          this.toastr.success("Book added in cart!");
        }
      });
    } else {
      this.toastr.info("Selected book is out of stock!");
    }
  }

  ngOnDestroy(): void {
    this.componentSubscriptions.unsubscribe();
  }

}

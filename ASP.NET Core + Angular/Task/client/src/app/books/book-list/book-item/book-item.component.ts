import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/_models/book';
import { AccountService } from 'src/app/_services/account.service';
import { BookService } from 'src/app/_services/book.service';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {

  @Input('book') book: Book | undefined;



  constructor(public accountService: AccountService, private bookService: BookService, private router: Router, private route: ActivatedRoute, private cartService: CartService, private toastr: ToastrService) { }

  //Navigate to ItemDetails OnClick of Item
  onItem(book: Book) {
        this.router.navigate([book.isbn], { relativeTo: this.route.parent })
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

import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/_models/book';
import { AccountService } from 'src/app/_services/account.service';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {

  @Input('book') book: Book | undefined;



  constructor(public accountService: AccountService, private bookService: BookService, private router: Router, private route: ActivatedRoute) { }

  //Navigate to ItemDetails OnClick of Item
  onItem(book: Book) {
    // this.bookService.getBook(book).subscribe({
    //   next: response => {
    //     if (response) {
    //       this.router.navigate([response.isbn], { relativeTo: this.route.parent })
    //     }
    //   }
    // });
    // let index = this.bookService.getBookIndexByISBN(book.isbn);
    // if (index >= 0) {
    //   this.router.navigate([index], { relativeTo: this.route.parent })
    // }
    this.router.navigate([book.isbn], { relativeTo: this.route.parent })
  }

  //OnClick AddToCart Item
  onAddToCart(event: Event, book: Book) {
    event.stopPropagation();
    // const index = this.itemService.getItemIndexById(item.itemId);
    // console.log('AddToCart clicked' + index);
    // // this.itemService.AddToCart(index,null,null);
    // this.cartService.AddToCart(index, null, null);
    // this.router.navigate(['items']);
  }
}

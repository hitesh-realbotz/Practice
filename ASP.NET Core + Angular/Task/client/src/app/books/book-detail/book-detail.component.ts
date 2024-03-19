import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/_models/book';
import { AccountService } from 'src/app/_services/account.service';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  index: string = '';
  book: Book | undefined;
  constructor(private route: ActivatedRoute,
    private router: Router, private bookService: BookService, private toastr: ToastrService, private accountService: AccountService) { }

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
  onAddToCart(event: Event, index: string) {
    event.stopPropagation();
    if (!this.accountService.currentUser$) {
      
      // this.cartService.AddToCart(index);
      this.router.navigate(['items']);
    } else {
      this.router.navigate(['/auth']);
      this.toastr.warning('Login to Place Order');
    }
  }

}

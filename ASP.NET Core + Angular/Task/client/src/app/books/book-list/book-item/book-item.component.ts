import { Component, Input } from '@angular/core';
import { Book } from 'src/app/_models/book';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {

  @Input('book') book: Book | undefined;

  
 
  constructor() { }

  //Navigate to ItemDetails OnClick of Item
  onItem(book: Book) {
    // let index = this.itemService.getItemIndexById(item.itemId);
    // this.router.navigate([index], { relativeTo: this.route.parent })
  }
}

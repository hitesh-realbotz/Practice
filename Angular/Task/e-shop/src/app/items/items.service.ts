import { EventEmitter, Injectable } from "@angular/core";
import { Item } from "./item.model";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: 'root' })
export class ItemsService {
    itemSelected = new EventEmitter<Item>();
    itemChanged = new Subject<Item[]>();

    private items: Item[] = [];

    constructor(private toastr: ToastrService) { }

    setItems(Items: Item[]) {
        this.items = Items;
        this.itemChanged.next(this.items.slice());
    }
    getItems() {
        console.log('get Items method called ');
        console.log(this.items);
        return this.items.slice();

    }

    getItem(index: number) {
        return this.items[index];
    }

    addItem(item: Item) {
        this.items.push(item);
        this.itemChanged.next(this.items.slice());
        this.toastr.info('New Item Added', 'Add Action');
    }
    updateItem(index: number, newItem: Item) {
        this.items[index] = newItem;
        this.itemChanged.next(this.items.slice());
        this.toastr.info('Item Updated', 'Update Action');
    }

    deleteItem(index: number) {

        this.items.splice(index, 1);
        this.itemChanged.next(this.items.slice());
        this.toastr.warning('Item Deleted', 'Delete Action');
    }
}

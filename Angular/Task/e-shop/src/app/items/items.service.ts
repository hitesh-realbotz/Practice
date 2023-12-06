import { EventEmitter, Injectable } from "@angular/core";
import { Item } from "./item.model";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../users/user.service";
import { User } from "../auth/user.model";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({ providedIn: 'root' })
export class ItemsService {
    itemSelected = new EventEmitter<Item>();
    itemChanged = new Subject<Item[]>();

    private items: Item[] = [];
    sellerItemsIndex: number[];

    constructor(private toastr: ToastrService, private userService: UserService, private dataStorageService: DataStorageService) { }

    setItems(items: Item[]) {
        this.items = items;
        this.itemChanged.next(this.items.slice());
    }
    getItems() {
        console.log('get Items method called ');
        console.log(this.items);
        // if (!this.items.length) {
        //     this.dataStorageService.fetchItems();
        // }
        // return this.items.slice();
        if (!this.items) {
            return null;
        }
        return this.items.slice();

    }

    getItem(index: number) {
        return this.items[index];
    }

    addItem(item: Item) {
        // this.userService.loggedUserChanged.subscribe(
        //     (user: User) => {
        //         item.sellerId = user.id;
        //         item.itemId = (this.items.length + 1);
        //     }
        // );
        item.sellerId = this.userService.loggedUser.id;
        item.itemId = (this.items.length + 1);

        this.items.push(item);
        this.itemChanged.next(this.items.slice());
        this.dataStorageService.storeItems();
        this.toastr.info('New Item Added', 'Add Action');
    }

    updateItem(index: number, newItem: Item) {
        this.items[index] = newItem;
        this.itemChanged.next(this.items.slice());
        this.dataStorageService.storeItems();
        this.toastr.info('Item Updated', 'Update Action');
    }

    deleteItem(index: number) {
        this.items.splice(index, 1);
        this.itemChanged.next(this.items.slice());
        this.dataStorageService.storeItems();
        this.toastr.warning('Item Deleted', 'Delete Action');
    }

    getItemsBySellerId(id: string) {
        const sellerItems: Item[] = [];
            this.sellerItemsIndex = [];
            for (const [index, itemFromList] of this.items.entries()) {
                if (itemFromList.sellerId === id) {
                    this.sellerItemsIndex.push(index);
                    sellerItems.push(itemFromList);
                }
            }
            return sellerItems;

    }
    
}

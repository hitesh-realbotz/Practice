import { EventEmitter, Injectable } from "@angular/core";
import { Item } from "./item.model";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../users/user.service";
import { User } from "../auth/user.model";
import { DataStorageService } from "../shared/data-storage.service";
import { UserDetails } from "../auth/userdetails.model";
import { CartItem } from "./cart/cartItem.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class ItemsService {
    itemSelected = new EventEmitter<Item>();
    itemChanged = new Subject<Item[]>();

    items: Item[] = [];
    sellerItemsIndex: number[];

    cartItemsChanged = new Subject<CartItem[]>();
    cartItems: CartItem[] = [];

    constructor(private toastr: ToastrService, 
                private userService: UserService, 
                private dataStorageService: DataStorageService,
                private router: Router) { }

    //Sets Items
    setItems(items: Item[]) {
        this.items = !!items ? items : [];
        console.log('!!items set', !!items)
        this.itemChanged.next(this.items.slice());
    }

    //Get All Items
    getItems() {
        if (!this.items) {
            return null;
        }
        return this.items.slice();
    }

    //Get Item by Item's index
    public getItem(index: number) {
        return this.items[index];
    }
    
    public getItemById(id: number) {
        return this.items.find(item => item.itemId === id);
    }

    public getItemIndexById(id: number) {
        return this.items.findIndex(item => item.itemId === id);
    }

    //Add new item to array & on Remote-Server
    addItem(item: Item) {
        item.sellerId = this.userService.loggedUser.id;
        item.itemId = (this.items.length + 1);

        this.items.push(item);
        this.itemChanged.next(this.items.slice());
        this.dataStorageService.storeItems();
        this.toastr.info('New Item Added', 'Add Action');
    }

    //Updates item in array & on Remote-Server
    updateItem(index: number, newItem: Item) {
        this.items[index] = newItem;
        this.itemChanged.next(this.items.slice());
        this.dataStorageService.storeItems();
        this.toastr.info('Item Updated', 'Update Action');
    }

    //Deletes item from array & on Remote-Server
    deleteItem(index: number) {        
        this.items.splice(this.sellerItemsIndex[index], 1);
        this.itemChanged.next(this.items.slice());
        this.dataStorageService.storeItems();
        this.toastr.warning('Item Deleted', 'Delete Action');
    }


    //Get Item by SellerId
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

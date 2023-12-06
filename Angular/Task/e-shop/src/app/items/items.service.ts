import { EventEmitter, Injectable } from "@angular/core";
import { Item } from "./item.model";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../users/user.service";
import { User } from "../auth/user.model";
import { DataStorageService } from "../shared/data-storage.service";
import { UserDetails } from "../auth/userdetails.model";

@Injectable({ providedIn: 'root' })
export class ItemsService {
    itemSelected = new EventEmitter<Item>();
    itemChanged = new Subject<Item[]>();

    items: Item[] = [];
    sellerItemsIndex: number[];
    cartItemsChanged = new Subject<Item[]>();
    cartItems: Item[] = [];

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

    public getItem(index: number) {
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

    updateCart(index: number) {
        console.log(index);
        console.log(this.items[index]);
        const item: Item = this.items[index];
        console.log("item from update method" + item);
        const userIndex = this.userService.loggedUserIndex;
        const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
        const userCart: number[] = usersDetList[userIndex].cart;
        userCart.includes(item.itemId) ? '' : usersDetList[userIndex].cart.push(item.itemId);

        this.cartItems.push(item);
        this.cartItemsChanged.next(this.cartItems);

        // if (userCart.includes(item.itemId)) {
        //     usersDetList[userIndex].cart.push(item.itemId);
        //     this.cartItems.push(item);
        //     this.cartItemsChanged.next(this.cartItems);
        // }
        
        localStorage.setItem('usersDetailList', JSON.stringify(usersDetList));

        // const localUserDet = this.userService.loggedUserDet;
        // localUserDet.cart.push(item.itemId);
        // localStorage.setItem('loggedUserDetail', JSON.stringify(localUserDet));
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
    getItemsById(ids: number[]) {
        this.cartItems = [];
        for (const itemFromList of this.items) {
            if (ids.includes(itemFromList.itemId)) {
                this.cartItems.push(itemFromList);
            }
        }
        return this.cartItems;
    }

}

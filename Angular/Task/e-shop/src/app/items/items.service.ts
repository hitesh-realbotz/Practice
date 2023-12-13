import { EventEmitter, Injectable } from "@angular/core";
import { Item } from "./item.model";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../users/user.service";
import { User } from "../auth/user.model";
import { DataStorageService } from "../shared/data-storage.service";
import { UserDetails } from "../auth/userdetails.model";
import { CartItem } from "./cartItem.model";

@Injectable({ providedIn: 'root' })
export class ItemsService {
    itemSelected = new EventEmitter<Item>();
    itemChanged = new Subject<Item[]>();

    items: Item[] = [];
    sellerItemsIndex: number[];

    cartItemsChanged = new Subject<CartItem[]>();
    cartItems: CartItem[] = [];

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

    // AddToCart(index?: number, cartItem?: CartItem, decreaseQuantity?: boolean) {
    //     console.log(index);
    //     console.log('index != null : ', index != null);
    //     console.log('decreaseQuantity : ', decreaseQuantity);
    //     console.log(this.items[index]);
    //     let item: Item;
    //     if (index != null) {
    //         item = { ...this.items[index] };
    //         console.log(item);
    //     } else {
    //         console.log("else");
    //         item = { ...cartItem.item };
    //     }

    //     console.log("item from update method", item);
    //     const userIndex = this.userService.loggedUserIndex;
    //     const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
    //     console.log("userIndex from update method", userIndex);
    //     console.log("usersDetList from update method", usersDetList);
    //     console.log("usersDetList from update method", usersDetList);
    //     const localUserCart: { id: number, qty: number }[] = usersDetList[userIndex].cart;

    //     let itemFound = false;
    //     for (const [indexPosition, curCartItem] of this.cartItems.entries()) {
    //         if (curCartItem.item.itemId === item.itemId) {

    //             if (index != null && curCartItem.item.availableQty > curCartItem.qty) {
    //                 curCartItem.item.price += item.price;
    //                 curCartItem.qty += 1;
    //             } else if (decreaseQuantity == null && curCartItem.item.availableQty > curCartItem.qty) {
    //                 console.log("curCartItem.item.availableQty", curCartItem.item.availableQty);
    //                 console.log("curCartItem.qty", curCartItem.qty);
    //                 curCartItem.item.price += item.price / curCartItem.qty;
    //                 curCartItem.qty += + 1;
    //             } else if (decreaseQuantity && curCartItem.qty > 1) {
    //                 curCartItem.item.price -= item.price / curCartItem.qty;
    //                 curCartItem.qty = curCartItem.qty - 1;
    //             } else if(decreaseQuantity) {
    //                 this.cartItems.splice(indexPosition, 1);
    //                 this.toastr.warning('Item removed from cart!!');
    //             } else{
    //                 this.toastr.warning('Not Available in Stock!!');
    //             }

    //             for (const [indexPosition, localCart] of localUserCart.entries()) {
    //                 if (curCartItem.item.itemId === localCart.id) {
    //                     if (index != null) {
    //                         localCart.qty += 1;
    //                     } else if (decreaseQuantity == null) {
    //                         localCart.qty += 1;
    //                     } else if (decreaseQuantity && curCartItem.qty > 1) {
    //                         localCart.qty -= 1;
    //                     } else {
    //                         localUserCart.splice(indexPosition, 1);
    //                     }
    //                     break;

    //                 }
    //             }
    //             itemFound = true;
    //             break;
    //         }
    //     }
    //     if (!itemFound) {
    //         localUserCart.push({ id: item.itemId, qty: 1 });
    //         this.cartItems.push(new CartItem(item, 1));
    //         // this.cartItemsChanged.next(this.cartItems);
    //     }
    //     this.cartItemsChanged.next(this.cartItems);
    //     console.log(this.cartItems);
    //     localStorage.setItem('usersDetailList', JSON.stringify(usersDetList));
    // }

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


    // getItemsById(localUserCart: { id: number, qty: number }[]) {
    //     this.cartItems = [];

    //     for (const localCart of localUserCart) {
    //         const foundItem = { ...this.items.find(item => item.itemId === localCart.id) };
    //         foundItem.price = foundItem.price * localCart.qty;
    //         if (foundItem) {
    //             this.cartItems.push(new CartItem(foundItem, localCart.qty));
    //         }
    //     }
    //     return this.cartItems;
    // }
}

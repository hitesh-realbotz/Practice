import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { CartItem } from "../cartItem.model";
import { ToastrService } from "ngx-toastr";
import { ItemsService } from "../items.service";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Item } from "../item.model";
import { UserService } from "src/app/users/user.service";

@Injectable({ providedIn: 'root' })
export class CartService {

    cartItemsChanged = new BehaviorSubject<CartItem[]>(null);
    cartItems: CartItem[] = [];
    selectedCartItems: CartItem[] = [];
    totalCartAmount: number = 0;
    totalSelectedCartAmount: number = 0;

    constructor(private toastr: ToastrService, private itemService: ItemsService, private userService: UserService, private dataStorageService: DataStorageService) { }


    AddToCart(index?: number, cartItem?: CartItem, decreaseQuantity?: boolean) {
        let item: Item;
        if (index != null) {
            item = { ...this.itemService.items[index] };
            console.log(item);
        } else {
            console.log("else");
            item = { ...cartItem.item };
        }

        const userIndex = this.userService.loggedUserIndex;
        const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
        const localUserCart: { id: number, qty: number, checked: boolean}[] = usersDetList[userIndex].cart;

        let itemFound = false;
        for (const [indexPosition, curCartItem] of this.cartItems.entries()) {
            if (curCartItem.item.itemId === item.itemId) {

                if (index != null && curCartItem.item.availableQty > curCartItem.qty) {
                    curCartItem.item.price += item.price;
                    curCartItem.qty += 1;
                } else if (decreaseQuantity == null && curCartItem.item.availableQty > curCartItem.qty) {
                    console.log("curCartItem.item.availableQty", curCartItem.item.availableQty);
                    console.log("curCartItem.qty", curCartItem.qty);
                    curCartItem.item.price += item.price / curCartItem.qty;
                    curCartItem.qty += + 1;
                } else if (decreaseQuantity && curCartItem.qty > 1) {
                    curCartItem.item.price -= item.price / curCartItem.qty;
                    curCartItem.qty = curCartItem.qty - 1;
                } else if (decreaseQuantity) {
                    this.cartItems.splice(indexPosition, 1);
                    this.toastr.warning('Item removed from cart!!');
                } else {
                    this.toastr.warning('Not Available in Stock!!');
                }

                for (const [indexPosition, localCart] of localUserCart.entries()) {
                    if (curCartItem.item.itemId === localCart.id) {
                        if (index != null) {
                            localCart.qty += 1;
                        } else if (decreaseQuantity == null) {
                            localCart.qty += 1;
                        } else if (decreaseQuantity && curCartItem.qty > 1) {
                            localCart.qty -= 1;
                        } else {
                            localUserCart.splice(indexPosition, 1);
                        }
                        break;
                    }
                }
                itemFound = true;
                break;
            }
        }
        if (!itemFound) {
            localUserCart.push({ id: item.itemId, qty: 1, checked: true});
            this.cartItems.push(new CartItem(item, 1, true));
        }
        this.calculateTotalAmount();
        this.cartItemsChanged.next(this.cartItems);
        console.log(this.cartItems);
        localStorage.setItem('usersDetailList', JSON.stringify(usersDetList));
    }


    getItems() {
        console.log('getItems called : ');
        if (!!this.userService.loggedUser && !!this.itemService.items) {
            const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
            const userIndex = this.userService.loggedUserIndex;
            let localUserCart: { id: number, qty: number, checked: boolean }[] = [];
            if (usersDetList && usersDetList[userIndex] && usersDetList[userIndex].cart) {
                localUserCart = usersDetList[userIndex].cart;
            }
            this.cartItems = [];
            for (const localCart of localUserCart) {
                const foundItem = { ...this.itemService.items.find(item => item.itemId === localCart.id) };
                foundItem.price = foundItem.price * localCart.qty;
                if (foundItem) {
                    this.cartItems.push(new CartItem(foundItem, localCart.qty, localCart.checked));
                }
            }
            this.calculateTotalAmount();
            this.cartItemsChanged.next(this.cartItems);
            return this.cartItems;
        }
    }

    calculateTotalAmount() {
        this.totalCartAmount = this.cartItems.reduce((total, item) => total + item.item.price, 0);
        this.totalSelectedCartAmount = this.cartItems.reduce((total, item) => total + (item.checked ? (item.item.price) : 0), 0);
    }
}
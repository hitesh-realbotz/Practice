import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { CartItem } from "./cartItem.model";
import { ToastrService } from "ngx-toastr";
import { ItemsService } from "../items.service";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Item } from "../item.model";
import { UserService } from "src/app/users/user.service";

@Injectable({ providedIn: 'root' })
export class CartService {

    cartItemsChanged = new BehaviorSubject<CartItem[]>(null);
    cartItems: CartItem[] = [];
    totalCartAmount: number = 0;
    totalSelectedCartAmount: number = 0;

    constructor(private toastr: ToastrService, private itemService: ItemsService, private userService: UserService, private dataStorageService: DataStorageService) { }


    AddToCart(index?: number, cartItem?: CartItem, decreaseQuantity?: boolean) {
        let item: Item;
        let actualItem: Item;
        if (index != null) {
            item = { ...this.itemService.items[index] };
            actualItem = this.itemService.items[index];
            console.log("Index Available  ", item);
            console.log("Index AvailableQty  ", item.availableQty);

        } else {
            console.log("else");
            item = { ...cartItem.item };
            actualItem = this.itemService.getItemById(cartItem.item.itemId);
        }

        const userIndex = this.userService.loggedUserIndex;
        const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
        // const localUserCart: { id: number, qty: number, checked: boolean }[] = usersDetList[userIndex].cart;
        // console.log('usersDetList[userIndex]',usersDetList);
        // console.log('usersDetList[userIndex]',userIndex);
        // console.log('usersDetList[userIndex]',usersDetList[userIndex]);
        // console.log(usersDetList[userIndex].cart);
        // let localUserCart;
        // if (usersDetList[userIndex].cart) {
        //     localUserCart = usersDetList[userIndex].cart ;
        // }else{
            

        //     localUserCart = [];
        // }
        const localUserCart = usersDetList[userIndex].cart ;
        console.log('usersDetList[userIndex].cart',usersDetList[userIndex].cart);

        let itemFound = false;
        for (const [indexPosition, curCartItem] of this.cartItems.entries()) {
            if (curCartItem.item.itemId === item.itemId) {
                console.log("curCartItem.qty  ", curCartItem.qty);
                if (index != null && item.availableQty > curCartItem.qty) {
                    // if (index != null && actualItem.availableQty > 0) {
                    curCartItem.item.price += item.price;
                    this.updateLocalStorage(localUserCart, curCartItem, false);
                    curCartItem.qty += 1;
                    // actualItem.availableQty -= 1;
                } else if (decreaseQuantity == null && item.availableQty > curCartItem.qty) {
                    // } else if (decreaseQuantity == null && actualItem.availableQty > 0) {
                    curCartItem.item.price += item.price / curCartItem.qty;
                    this.updateLocalStorage(localUserCart, curCartItem, false);
                    curCartItem.qty += 1;
                    // actualItem.availableQty -= 1;
                } else if (decreaseQuantity && curCartItem.qty > 1) {
                    curCartItem.item.price -= item.price / curCartItem.qty;
                    this.updateLocalStorage(localUserCart, curCartItem, true);
                    curCartItem.qty = curCartItem.qty - 1;
                    // actualItem.availableQty += 1;
                } else if (decreaseQuantity) {
                    this.updateLocalStorage(localUserCart, curCartItem, true);
                    this.cartItems.splice(indexPosition, 1);
                    // actualItem.availableQty += 1;
                    this.toastr.warning('Item removed from cart!!');
                } else {
                    this.toastr.warning('Not Available in Stock!!');
                }

                itemFound = true;
                break;
            }
        }
        if (!itemFound) {
            console.log('itemNot found');
            localUserCart.push({ id: item.itemId, qty: 1, checked: true });
            this.cartItems.push(new CartItem(item, 1, true));
            // actualItem.availableQty -= 1;
        }
        this.calculateTotalAmount();
        this.cartItemsChanged.next(this.cartItems);

        console.log(this.cartItems);
        localStorage.setItem('usersDetailList', JSON.stringify(usersDetList));
    }

    updateLocalStorage(localUserCart, curCartItem, decreaseQuantity) {
        for (let [indexPosition, localCart] of localUserCart.entries()) {
            console.log('curCartItem.qty : ', curCartItem.qty)
            console.log('localCart : ', localCart)
            if (curCartItem.item.itemId === localCart.id) {
                if ((decreaseQuantity == false)) {
                    // localCart[indexPosition] = { id: curCartItem.item.itemId, qty: curCartItem.qty + 1, checked: true };
                    localCart.qty += 1;
                } else if (decreaseQuantity && curCartItem.qty > 1) {
                    // localCart[indexPosition] = { id: curCartItem.item.itemId, qty: curCartItem.qty - 1, checked: true };
                    localCart.qty -= 1;
                } else {
                    localUserCart.splice(indexPosition, 1);
                }
                break;
            }
        }
    }

    // getItems() {
    //     console.log('getItems called : ');
    //     console.log(this.cartItems);
    //     if (!!this.userService.loggedUser && !!this.itemService.items) {
    //         const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
    //         const userIndex = this.userService.loggedUserIndex;
    //         // let localUserCart: { id: number, qty: number, checked: boolean }[] = usersDetList[userIndex].cart;
    //         let localUserCart = [];
    //         if (usersDetList && usersDetList[userIndex] && usersDetList[userIndex].cart) {
    //             localUserCart = usersDetList[userIndex].cart;
    //         }
    //         this.cartItems = [];
    //         // for (const localCart of localUserCart) {
    //         for (let [indexPosition, localCart] of localUserCart.entries()) {
    //             const foundItem = { ...this.itemService.items.find(item => item.itemId === localCart.id)};

    //             console.log('found Item from getItems : ', foundItem);
    //             console.log('found localCart from getItems : ', localCart[indexPosition]);
    //             foundItem.price = foundItem.price * localCart[indexPosition].qty;

    //             if (foundItem && !this.cartItems.find(item => item.item.itemId == localCart[indexPosition].id)) {
    //                 console.log('from getItems if')
    //                 // this.itemService.items.find(item => item.itemId === localCart.id).availableQty -= localCart.qty;
    //                 this.cartItems.push(new CartItem(foundItem, localCart[indexPosition].qty, localCart.checked));
    //             }
    //         }
    //         this.calculateTotalAmount();
    //         this.cartItemsChanged.next(this.cartItems);
    //         return this.cartItems;
    //     }
    // }

    getItems() {
        if (!!this.userService.loggedUser && !!this.itemService.items) {
            const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
            const userIndex = this.userService.loggedUserIndex;
            const localUserCart = usersDetList?.[userIndex]?.cart || [];
    
            this.cartItems = [];
    
            for (const cartItem of localUserCart) {
                const foundItem = { ...this.itemService.items.find(item => item.itemId === cartItem.id) };
    
                if (foundItem) {
                    const totalPrice = foundItem.price * cartItem.qty;
                    foundItem.price = totalPrice;
    
                    const existingCartItem = this.cartItems.find(item => item.item.itemId === cartItem.id);
    
                    if (!existingCartItem) {
                        this.cartItems.push(new CartItem(foundItem, cartItem.qty, cartItem.checked));
                    }
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


    clearCart(orderPlaced?: boolean) {
        const userIndex = this.userService.loggedUserIndex;
        const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
        let usercart = usersDetList[userIndex].cart;
        if (!!orderPlaced) {
            for (const cartItem of usercart) {
                // console.log(this.itemService.items[this.itemService.getItemIndexById(cartItem.id)].availableQty);
                // this.itemService.items[this.itemService.getItemIndexById(cartItem.id)].availableQty -= cartItem.qty;
                // console.log(this.itemService.items[this.itemService.getItemIndexById(cartItem.id)].availableQty);
            }
            this.dataStorageService.storeItems();
        }

        usersDetList[userIndex].cart = [];
        localStorage.setItem('usersDetailList', JSON.stringify(usersDetList));
        this.cartItems = [];
        this.totalCartAmount = 0;
        this.totalSelectedCartAmount = 0;
        this.toastr.warning('Items removed from cart!!');
        return this.cartItems;
    }




}
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


    //Add to Cart, Update CartItem quantity (+/-)
    AddToCart(index?: number, cartItem?: CartItem, decreaseQuantity?: boolean) {
        let item: Item;
        let actualItem: Item;

        //On-Click Add to Cart From ItemList
        if (index != null) {
            item = { ...this.itemService.items[index] };
            actualItem = this.itemService.items[index];
            console.log("Index Available  ", item);
            console.log("Index AvailableQty  ", item.availableQty);
        }
        //On-Click + / - From CartDetails
        else {
            console.log("else");
            item = { ...cartItem.item };
            actualItem = this.itemService.getItemById(cartItem.item.itemId);
        }

        // let userIndex = this.userService.loggedUserIndex;
        let userIndex ;
        const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
        for (let [indexPosition, user] of usersDetList.entries()) {
            if(user.id == this.userService.loggedUser.id){
                userIndex = indexPosition;
            }
        }
        const localUserCart = usersDetList[userIndex].cart;

        let itemFound = false;
        for (const [indexPosition, curCartItem] of this.cartItems.entries()) {
            if (curCartItem.item.itemId === item.itemId) {
                
                //On-Click Add to Cart From ItemList
                if (index != null && item.availableQty > curCartItem.qty) { 
                    curCartItem.item.price += item.price;
                    this.updateLocalStorage(localUserCart, curCartItem, false);
                    curCartItem.qty += 1;
                } 
                //On-Click + From CartDetails
                else if (decreaseQuantity == null && item.availableQty > curCartItem.qty) { 
                    curCartItem.item.price += item.price / curCartItem.qty;
                    this.updateLocalStorage(localUserCart, curCartItem, false);
                    curCartItem.qty += 1;
                }
                //Decreases CartItem quantity => On-Click - From CartDetails
                else if (decreaseQuantity && curCartItem.qty > 1) { 
                    curCartItem.item.price -= item.price / curCartItem.qty;
                    this.updateLocalStorage(localUserCart, curCartItem, true);
                    curCartItem.qty = curCartItem.qty - 1;
                }
                //Removes CartItem => On-Click - From CartDetails 
                else if (decreaseQuantity) { 
                    this.updateLocalStorage(localUserCart, curCartItem, true);
                    this.cartItems.splice(indexPosition, 1);
                    this.toastr.warning('Item removed from cart!!');
                }
                //CartItem quantity reached available quantity 
                else {
                    this.toastr.warning('Not Available in Stock!!');
                }
                itemFound = true;
                break;
            }
        }
        //On-Click Add to Cart From ItemList in case of empty Cart
        if (!itemFound) {
            console.log('itemNot found');
            localUserCart.push({ id: item.itemId, qty: 1, checked: true });
            this.cartItems.push(new CartItem(item, 1, true));
        }
        this.calculateTotalAmount();
        this.cartItemsChanged.next(this.cartItems);
        localStorage.setItem('usersDetailList', JSON.stringify(usersDetList));
    }

    //UPdates local storage as per UserCart
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


    //Retrives UserCart Data
    getItems() {
        if (!!this.userService.loggedUser && !!this.itemService.items) {
            const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
            // let userIndex = this.userService.loggedUserIndex;
            let userIndex ;
            for (let [indexPosition, user] of usersDetList.entries()) {
                if(user.id == this.userService.loggedUser.id){
                    userIndex = indexPosition;
                }
            }
            const localUserCart = usersDetList[userIndex].cart;
            // const localUserCart = usersDetList?.[userIndex]?.cart || [];
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


    //Calculates TotalCart Amount & Selected CartItems's TotalAmount
    calculateTotalAmount() {
        this.totalCartAmount = this.cartItems.reduce((total, item) => total + item.item.price, 0);
        this.totalSelectedCartAmount = this.cartItems.reduce((total, item) => total + (item.checked ? (item.item.price) : 0), 0);
    }


    //Removes CartItems
    clearCart(orderPlaced?: boolean) {
        // let userIndex = this.userService.loggedUserIndex;
        let userIndex ;
        const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
        for (let [indexPosition, user] of usersDetList.entries()) {
            if(user.id == this.userService.loggedUser.id){
                userIndex = indexPosition;
            }
        }
        let usercart = usersDetList[userIndex].cart;
        usersDetList[userIndex].cart = [];
        localStorage.setItem('usersDetailList', JSON.stringify(usersDetList));
        this.cartItems = [];
        this.totalCartAmount = 0;
        this.totalSelectedCartAmount = 0;
        this.toastr.warning('Items removed from cart!!');
        return this.cartItems;
    }




}
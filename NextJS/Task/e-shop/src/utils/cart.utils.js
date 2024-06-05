import { toast } from "react-toastify";

export const toggleItemIsChecked = (userCart, item) => {
    let cart = { ...userCart };
    if (!!cart.cartItems) {
        const cartItemIndex = cart.cartItems.findIndex(i => i.itemId == item.itemId);
        if (cartItemIndex == -1) {
            return null;
        }
        let updatedCart = {
            ...cart,
            cartItems: cart.cartItems.map((cartItem, index) =>
                index === cartItemIndex ? {
                    ...cartItem,
                    isChecked: !cartItem.isChecked
                } : cartItem
            ),
        };
        updatedCart = updateCartTotalPrice(updatedCart);
        return updatedCart;

    } else {
        cart = addNewItemToCart(item);
        return cart;
    }
}
export const addToCart = (userCart, item) => {
    let cart = { ...userCart };
    if (!!cart.cartItems) {
        const cartItemIndex = cart.cartItems.findIndex(i => i.itemId == item.itemId);
        if (cartItemIndex == -1) {
            const newCartItem = getNewCartItem(item);
            cart = {
                ...cart,
                cartItems: [...cart.cartItems, newCartItem]
            };
            cart = updateCartTotalPrice(cart);
            return cart;
        }
        if (cart.cartItems[cartItemIndex].qty >= item.availableQty) {
            toast.error("Cart Item reached avaialble quantity!");
            return null;
        }
        let updatedCart = {
            ...cart,
            cartItems: cart.cartItems.map((cartItem, index) =>
                index === cartItemIndex ? {
                    ...cartItem,
                    qty: cartItem.qty + 1,
                    totalPrice: ((cartItem.qty + 1) * item.price)
                } : cartItem
            ),
        };
        updatedCart = updateCartTotalPrice(updatedCart);
        return updatedCart;

    } else {
        cart = addNewItemToCart(item);
        return cart;
    }
}


export const decreaseQtyFromCart = (userCart, item) => {
    let cart = { ...userCart };
    const cartItemIndex = cart.cartItems.findIndex(i => i.itemId == item.itemId);
    if (cartItemIndex == -1) {
        return null;
    }
    if (cart.cartItems[cartItemIndex].qty == 1) {
        let updatedCart = {
            ...cart,
            cartItems: cart.cartItems.filter((cartItem, index) =>
                index !== cartItemIndex
            ),
        };
        updatedCart = updateCartTotalPrice(updatedCart);
        return updatedCart;
    }
    let updatedCart = {
        ...cart,
        cartItems: cart.cartItems.map((cartItem, index) =>
            index === cartItemIndex ? {
                ...cartItem,
                qty: cartItem.qty - 1,
                totalPrice: ((cartItem.qty - 1) * item.price)
            } : cartItem
        ),
    };
    updatedCart = updateCartTotalPrice(updatedCart);
    return updatedCart;
}



export const updateCartTotalPrice = (cart) => {
    return {
        ...cart,
        totalPrice: (cart.cartItems.reduce((acc, cartItem) => {
            return acc += cartItem.totalPrice;
        }, 0)),
        totalCheckedPrice: (cart.cartItems.reduce((acc, cartItem) => {
            return cartItem.isChecked ? acc += cartItem.totalPrice : acc;
        }, 0))
    };
}

const addNewItemToCart = (item) => {
    const cart = {
        cartItems: [],
        totalPrice: 0,
        totalCheckedPrice: 0
    };
    const newCartItem = getNewCartItem(item);
    cart.cartItems.push(newCartItem);
    cart.totalPrice = newCartItem.totalPrice;
    cart.totalCheckedPrice = newCartItem.totalPrice;
    return cart;
}

const getNewCartItem = (item) => {
    return {
        itemId: item.itemId,
        isChecked: true,
        qty: 1,
        totalPrice: item.price
    };
}


"use client"
import { useState } from "react";
import { getUpdatedErrorMsg, validateForm } from "@/utils/validation/validation.utils";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DropdownInput from "../component/form-input/dropdown-input";
import { ADDRESS_ERROR_TAG, AMOUNT_ERROR_TAG, ANSWER_ERROR_TAG, BUYER_NAME_ERROR_TAG, CARD_NO_ERROR_TAG, CONTACT_NO_ERROR_TAG, CVV_ERROR_TAG, EMAIL_ERROR_TAG, PIN_ERROR_TAG, SHIPPING_METHOD_1, SHIPPING_METHOD_2, SHIPPING_METHOD_ERROR_TAG, SORT_ORDER_ASC, S_QUESTION_1, S_QUESTION_2, S_QUESTION_3, S_QUESTION_ERROR_TAG } from "@/config/constants";
import FormInput from "../component/form-input/text-input";
import TextAreaInput from "../component/form-input/text-area-input";
import PasswordInput from "../component/form-input/password-input";
import { addOrder } from "../store/orderSlice";
import { updateCartTotalPrice } from "@/utils/cart.utils";
import { updateUser } from "../store/userSlice";
import { updateProducts } from "../store/productSlice";

const defaultErrorMessages = {
    buyerNameError: "",
    contactNoError: "",
    addressError: "",
    amountError: "",
    cardNoError: "",
    cvvError: "",
    pinError: "",
    shippingMethodError: "",
};

export default function Page() {
    const dispatch = useDispatch();
    const router = useRouter();
    let userData = useSelector((data) => data.usersData.userData);
    let products = useSelector((state) => state.productsData.products);
    let orders = useSelector((state) => state.ordersData.orders);
    let itemsToBeOrdered = userData.cart.cartItems.filter(item => item.isChecked);
    let itemsToBeKept = userData.cart.cartItems.filter(item => !item.isChecked);
    itemsToBeOrdered = [...itemsToBeOrdered.map((oItem) => {
        const {availableQty, qty, ...restItem} =  {...products.find(item =>item.itemId === oItem.itemId)} 
        return {...restItem, qty: oItem.qty, totalPrice: oItem.totalPrice};
    })]
    console.log("OrderedItems ",  itemsToBeOrdered);

    let defaultFormFields = {
        buyerName: "",
        contactNo: "",
        address: "",
        amount: userData.cart.totalCheckedPrice,
        cardNo: "",
        cvv: "",
        pin: "",
        shippingMethod: "",
        
    };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { buyerName, contactNo, address, amount, cardNo, cvv, pin, shippingMethod } = formFields;
    const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
    const { buyerNameError, contactNoError, addressError, amountError, cardNoError, cvvError, pinError, shippingMethodError } = errorMessages;

    //Reset FormFields
    const resetFormFields = () => {
        setErrorMessages(defaultErrorMessages);
        setFormFields(defaultFormFields);
    };

    //handle FormSubmit
    const handleSubmit = async (event) => {

        event.preventDefault();
        
        const validationResult = validateForm(Object.keys(formFields), Object.values(formFields), Object.keys(defaultErrorMessages));
        if (!validationResult.isValid) {
            setErrorMessages(validationResult.errors);
            return;
        }
        const orderTobeAdded = {orderId: orders.length ? `${userData.localId}-${orders.length+1}` : `${userData.localId}-1` ,buyerName,contactNo, amount, shippingMethod, address, buyerId: userData.localId, orderedItems: [...itemsToBeOrdered]};
        orders = [...orders, orderTobeAdded];
        
        const response = await dispatch(addOrder({orders : orders, buyerId: userData.localId} ));
        
        
        if (!!response.payload) {
            
            //Updating Products
            products = {...products.map((item, index) => {
                const orderedItem = itemsToBeOrdered.find(iToBeOrdered => iToBeOrdered.itemId == item.itemId);
                return !!orderedItem 
                ? {...item, availableQty: (item.availableQty - orderedItem.qty) } 
                : item;
            })};
            console.log("updatedproducts changed",  products);
            dispatch(updateProducts({products}));

            //Removing cart items
            let updatedCart = {...userData.cart};
            updatedCart = {...updatedCart, cartItems: itemsToBeKept};
            updatedCart = updateCartTotalPrice({...updatedCart});
            dispatch(updateUser({...userData, cart: {...updatedCart}}));
            router.push("/");

        }
    };

    //handle Change for TextInput
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };


    //handle Blur for TextInput
    const onHandleBlur = (event, errorTag) => {
        const { name, value } = event.target;
        const errors = getUpdatedErrorMsg(errorTag, name, value, errorMessages);
        setErrorMessages(errors);
    };


    //handle Change for Select
    const handleChangeSelect = (event, name, errorTag) => {
        const { value } = event.target;
        setFormFields({ ...formFields, [name]: value });
        const errors = getUpdatedErrorMsg(errorTag, name, value, errorMessages);
        setErrorMessages(errors);
    };

    //handle Blur for Select
    const onHandleBlurSelect = (event, name, errorTag) => {
        const { value } = event.target;
        if (value.length) return;

        handleChangeSelect(event, name, errorTag);
    };

    //SecurityQuestion options
    const shippingMethods = [
        { value: SHIPPING_METHOD_1, label: SHIPPING_METHOD_1 },
        { value: SHIPPING_METHOD_2, label: SHIPPING_METHOD_2 },
    ];

    return (
        <>
            <main className="align-items-center pt-5" >
                {/* <div className="d-flex flex-column align-items-center border border-dark p-3 bg-primary-subtle col-lg-4 col-xl-4 col-xxl-3 col-4 col-md-6 col-sm-12"  > */}
                <div className="d-flex flex-column align-items-center border border-dark p-3 bg-primary-subtle"
                    sx={{ flexGrow: 1, width: { xs: '100%', md: '40%' } }}  >
                    <h1>Payment</h1>
                    <form onSubmit={handleSubmit} >
                        <div className="row">
                            <div className="col-6 ">
                                <FormInput
                                    label='Buyer Name'
                                    type='text'
                                    name='buyerName'
                                    value={buyerName}
                                    onChange={handleChange}
                                    handleBlur={(event) => onHandleBlur(event, BUYER_NAME_ERROR_TAG)}
                                    errorM={buyerNameError}
                                />
                            </div>
                            <div className="col-6">
                                <FormInput
                                    label='Contact No.'
                                    type='text'
                                    name='contactNo'
                                    value={contactNo}
                                    onChange={handleChange}
                                    handleBlur={(event) => onHandleBlur(event, CONTACT_NO_ERROR_TAG)}
                                    errorM={contactNoError}
                                    min={1}

                                />
                            </div>
                        </div>
                        <div className="row ">
                            <TextAreaInput
                                label='Address'
                                type='text'
                                name='address'
                                value={address}
                                onChange={handleChange}
                                handleBlur={(event) => onHandleBlur(event, ADDRESS_ERROR_TAG)}
                                errorM={addressError}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 ">
                                <DropdownInput
                                    label='Shipping Method'
                                    options={shippingMethods}
                                    handleChange={(event, name) => handleChangeSelect(event, name, SHIPPING_METHOD_ERROR_TAG)}
                                    handleBlur={(event, name) => onHandleBlurSelect(event, name, SHIPPING_METHOD_ERROR_TAG)}
                                    errorM={shippingMethodError}
                                    value={shippingMethod}
                                    name='shippingMethod'
                                />
                            </div>
                            <div className="col-6">
                                <FormInput
                                    label='Amount'
                                    type='text'
                                    name='amount'
                                    value={amount}
                                    onChange={handleChange}
                                    handleBlur={(event) => onHandleBlur(event, AMOUNT_ERROR_TAG)}
                                    errorM={amountError}
                                    readOnly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <PasswordInput
                                    label='Card No.'
                                    type='text'
                                    name='cardNo'
                                    value={cardNo}
                                    onChange={handleChange}
                                    handleBlur={(event) => onHandleBlur(event, CARD_NO_ERROR_TAG)}
                                    errorM={cardNoError}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <PasswordInput
                                    label='CVV'
                                    type='password'
                                    name='cvv'
                                    value={cvv}
                                    onChange={handleChange}
                                    handleBlur={(event) => onHandleBlur(event, CVV_ERROR_TAG)}
                                    errorM={cvvError}
                                />
                            </div>
                            <div className="col-6">
                                <PasswordInput
                                    label='Pin'
                                    type='password'
                                    name='pin'
                                    value={pin}
                                    onChange={handleChange}
                                    handleBlur={(event) => onHandleBlur(event, PIN_ERROR_TAG)}
                                    errorM={pinError}
                                />
                            </div>
                        </div>

                        <div className="row d-flex justify-content-center mb-3">
                            <div className="col-6">
                                <button type='submit' className="btn btn-primary col-12">Place Order</button>
                            </div>
                            <div className="col-6">
                                <button type='button' className="btn btn-secondary col-12" onClick={resetFormFields}>Reset</button>
                            </div>
                        </div>
                    </form>
                </div >
            </main >
        </>
    );
}
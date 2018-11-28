export interface Invoice {
    id: string;
    timeStamp: number;
    items: Array<Item>;
    customer: Customer;
    cart: Cart;
}

export interface Cart {
    taxPercentage: number;
    taxAmount: number;
    discountPercentage: number;
    discountAmount: number;
    subTotal: number;
    grandTotal: number;
}

export interface Customer {
    name: string;
    mobileNumber: number;
    address: string;
    emailId: string;
    pincode: number;
}

export interface Item {
    item: string;
    quantity: number;
    price: number;
}
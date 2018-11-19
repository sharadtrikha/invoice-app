export interface Invoice {
    id: string;
    timeStamp: number;
    items: Array<Item>;
    customer: Customer;
    tax: number;
    discount: number;
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
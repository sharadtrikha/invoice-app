import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer, Invoice, Item } from '../model/model';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  @Output('on-invoice-save') onInvoiceSave: EventEmitter<boolean> = new EventEmitter();
  subTotalAmount: number = 0;
  taxAmount: number = 0;
  discountAmount: number = 0;
  totalAmount: number = 0;

  headers = [
    {
      key: 'Item',
      size: '60%'
    },
    {
      key: 'Quantity',
      size: '20%'
    },
    {
      key: 'Price - ₹',
      size: '20%'
    }
  ];

  invoiceData = [];

  @ViewChild('customerForm') customerForm: NgForm;
  @ViewChild('itemName') itemNameInputControl: ElementRef;
  public customerDetailsSkipped: boolean = false;
  public customerFormSubmitted: boolean = false;

  public customer: Customer = {
    name: '',
    address: '',
    emailId: '',
    mobileNumber: null,
    pincode: null
  };

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    //this.calculateSubTotal();
  }

  onCustomerFormSubmit() {
    this.customer = this.customerForm.value;
    this.customerFormSubmitted = true;
    console.log(this.customer);
  }

  onSkipClicked() {
    this.customerDetailsSkipped = true;
  }

  onEditCustomerDetails() {
    this.customerFormSubmitted = false;
  }

  onInvoiceDataSubmit(invoiceData: NgForm) {
    let tableData = invoiceData.value;
    if (tableData && tableData.item && tableData.price && tableData.quantity) {
      invoiceData.reset();
      // invoiceData.resetForm();
      this.itemNameInputControl.nativeElement.focus();
      let invoiceItem = [];
      for (let keys in tableData) {
        invoiceItem.push({
          key: keys,
          value: tableData[keys]
        });
      }

      this.invoiceData.push({
        row: invoiceItem
      });

      this.calculateSubTotal();
    }
  }

  calculateSubTotal() {
    this.subTotalAmount = 0;
    this.invoiceData.forEach(data_ => {
      this.subTotalAmount =
        this.subTotalAmount + (data_.row[2].value as number);
    });

    this.onTaxChange(this.taxAmount);
    this.onDiscountChange(this.discountAmount);
    this.onGrandTotalChange();
    // this.onTaxChange();
    //return this.subTotalAmount;
  }

  onTaxChange(value): void {
    this.taxAmount = (value / 100) * this.subTotalAmount;
    this.onGrandTotalChange();
  }

  onDiscountChange(value): void {
    this.discountAmount = (value / 100) * this.subTotalAmount;
    this.onGrandTotalChange();
  }

  onGrandTotalChange() {
    this.totalAmount =
      this.subTotalAmount + this.taxAmount - this.discountAmount;
  }

  onSaveInvoice() {
    let items: Array<Item> = [];
    this.invoiceData.forEach(item_ => {
      if (item_ && item_.row) {
        let temp = {};
        item_.row.forEach(data_ => {
          temp[data_.key] = data_.value;
        });
        items.push(temp as Item);
      }
    });

    let invoice: Invoice = {
      id: this.invoiceService.getLocalInvoiceList().length + 1,
      customer: {
        name: this.customer.name,
        address: this.customer.address,
        emailId: this.customer.emailId,
        mobileNumber: this.customer.mobileNumber,
        pincode: this.customer.pincode
      },
      subTotal: this.subTotalAmount,
      discount: this.discountAmount,
      tax: this.taxAmount,
      grandTotal: this.totalAmount,
      items: items,
      timeStamp: new Date().getTime()
    };

    console.log(invoice);
    this.invoiceService.onAddInvoice$.next(invoice);
    this.onInvoiceSave.emit(true);
  }
}

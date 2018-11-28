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
  taxPercentage: number;
  discountPercentage: number;

  headers: Array<string> = ['item', 'quantity', 'price'];
  tableData: Array<Item> = [];

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
    this.intializeCustomer();
  }

  onCustomerFormSubmit() {
    this.customer = this.customerForm.value;
    this.customerFormSubmitted = true;
  }

  onSkipClicked() {
    this.intializeCustomer();
    this.customerDetailsSkipped = true;
  }

  intializeCustomer() {
    this.customer.name = this.customer.address = this.customer.emailId = '';
    this.customer.mobileNumber = this.customer.pincode = null;
  }

  onEditCustomerDetails() {
    this.customerFormSubmitted = this.customerDetailsSkipped = false;
  }

  onInvoiceDataSubmit(invoiceData: NgForm) {
    let tableData = invoiceData.value;
    if (tableData && tableData.item && tableData.price && tableData.quantity) {
      invoiceData.reset();
      this.itemNameInputControl.nativeElement.focus();
      this.tableData.push({
        item: tableData.item,
        price: tableData.price,
        quantity: tableData.quantity
      });

      this.calculateSubTotal();
    }
  }

  calculateSubTotal() {
    this.subTotalAmount = 0;
    this.tableData.forEach(data_ => {
      if (data_) {
        this.subTotalAmount = this.subTotalAmount + data_.price;
      }
    });

    this.onTaxChange(this.taxAmount);
    this.onDiscountChange(this.discountAmount);
    this.onGrandTotalChange();
  }

  onTaxChange(value): void {
    this.taxAmount = Math.round((value / 100) * this.subTotalAmount);
    this.onGrandTotalChange();
  }

  onDiscountChange(value): void {
    this.discountAmount = Math.round((value / 100) * this.subTotalAmount);
    this.onGrandTotalChange();
  }

  onGrandTotalChange() {
    this.totalAmount =
      this.subTotalAmount + this.taxAmount - this.discountAmount;
  }

  onSaveInvoice() {

    let invoice: Invoice = {
      id: (this.invoiceService.getLocalInvoiceList().length + 1).toString(),
      customer: {
        name: this.customerDetailsSkipped ? 'Unknown User' : this.customer.name,
        address: this.customerDetailsSkipped ? '' : this.customer.address,
        emailId: this.customerDetailsSkipped ? '' : this.customer.emailId,
        mobileNumber: this.customerDetailsSkipped ? undefined : this.customer.mobileNumber,
        pincode: this.customerDetailsSkipped ? undefined : this.customer.pincode
      },
      items: this.tableData,
      cart: {
        taxAmount: this.taxAmount,
        discountAmount: this.discountAmount,
        taxPercentage: this.taxPercentage ? this.taxPercentage : 0,
        discountPercentage: this.discountPercentage ? this.discountPercentage : 0,
        subTotal: this.subTotalAmount,
        grandTotal: this.totalAmount
      },
      timeStamp: new Date().getTime()
    };

    this.invoiceService.onAddInvoice$.next(invoice);
    this.onInvoiceSave.emit(true);
  }
}

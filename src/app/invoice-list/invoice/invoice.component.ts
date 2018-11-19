import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../../model/model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  todayInvoice: boolean = false; //boolean to check whether invoice is of today's date or not
  @Input('invoice') invoice: Invoice;
  @Output('invoice-clicked') clickedInvoice: EventEmitter<Invoice> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.checkInvoiceDate();
  }

  //method to check whether invoice is of today's date or not
  checkInvoiceDate() {
    let currentDate = new Date();
    let invoiceDate = new Date(this.invoice.timeStamp);
    if ((currentDate.getDate() === invoiceDate.getDate()) &&
      (currentDate.getMonth() === invoiceDate.getMonth()) &&
      (currentDate.getFullYear() === invoiceDate.getFullYear())) {
      this.todayInvoice = true;
    }
  }


  onInvoiceClick(invoice: Invoice) {
    this.clickedInvoice.emit(invoice);
  }

}

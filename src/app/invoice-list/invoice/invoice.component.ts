import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../../model/model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {

  @Input('invoice') invoice: Invoice;
  @Output('invoice-clicked') clickedInvoice: EventEmitter<Invoice> = new EventEmitter();

  constructor() { }


  onInvoiceClick(invoice: Invoice) {
    this.clickedInvoice.emit(invoice);
  }

}

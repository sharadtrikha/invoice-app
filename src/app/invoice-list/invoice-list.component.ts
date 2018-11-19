import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../model/model';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  @Input('invoice-list') listOfInvoice: Array<Invoice> = [];
  @Output('selected-invoice') selectedInvoice: EventEmitter<Invoice> = new EventEmitter();

  constructor(private _invoiceService: InvoiceService) { }

  ngOnInit() {

    this.sortByDate();
    this._invoiceService.onAddInvoice$.subscribe(invoice => {
      if (invoice) {
        this.listOfInvoice.push(invoice);
        this.sortByDate();
      }
    })
  }

  public onClickedInvoice(invoice: Invoice) {
    console.log(invoice);
    this.selectedInvoice.emit(invoice);
  }

  public sortByDate() {
    this.listOfInvoice = this.listOfInvoice.sort((a, b) => {
      return b.timeStamp - a.timeStamp;
    });
    localStorage.clear();
    const invoiceListObject = {
      invoiceData: this.listOfInvoice
    }
    localStorage.setItem("invoiceList", JSON.stringify(this.listOfInvoice));
  }

  public onSearch(userInput: string) {

    console.log((localStorage.getItem("invoiceList")));
    this.listOfInvoice = JSON.parse(localStorage.getItem("invoiceList"));
    console.log(userInput);
    this.listOfInvoice = this.listOfInvoice.filter(invoice => {
      return (invoice.id.toUpperCase().includes(userInput.toUpperCase()) || (invoice.customer.name.toUpperCase().includes(userInput.toUpperCase())))
    })
  }

}

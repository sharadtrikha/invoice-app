import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../model/model';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

  @Input('invoice-detail') invoice: Invoice;
  headers: Array<string> = []; //to store column names of tabular data

  constructor() { }

  ngOnInit() {
    this.headers = Object.keys(this.invoice.items[0]);
  }
}

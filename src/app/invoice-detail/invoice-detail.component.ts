import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Invoice } from '../model/model';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit, OnChanges {

  @Input('invoice-detail') invoice: Invoice;
  invoiceData = [];

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

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    let data = [];
    let temp = { row: [] };
    const keys = Object.keys(this.invoice.items[0])


    this.invoice.items.forEach((data_, i) => {

      temp = { row: [] }


      let itemName = {};
      itemName["key"] = keys[0];
      itemName["value"] = data_.item;
      temp.row.push(itemName);

      let quantity = {};
      quantity["key"] = keys[1];
      quantity["value"] = data_.quantity;
      temp.row.push(quantity);

      let price = {};
      price["key"] = keys[2];
      price["value"] = data_.price;
      temp.row.push(price);

      data.push(temp);

    });

    this.invoiceData = data;
  }



}

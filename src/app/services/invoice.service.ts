import { Injectable } from '@angular/core';
import { Invoice } from "../model/model";
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  public onAddInvoice$: Subject<Invoice> = new Subject();
  public invoiceList: Array<Invoice> = [];

  constructor(private http: HttpClient) {
   }

  public getInvoiceData(): Observable<any> {
    return this.http.get('../assets/invoicedata.json');
  }

  public getLocalInvoiceList(){
    return JSON.parse(localStorage.getItem('invoiceList'));
  }
}

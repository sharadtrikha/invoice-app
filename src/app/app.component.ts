import { Component, OnInit } from '@angular/core';
import { Invoice } from '../app/model/model';
import { InvoiceService } from '../app/services/invoice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  modalState: boolean = true;
  selectedInvoice: Invoice;
  currentOrderIndex: number = 0;
  invoiceList: Array<Invoice>;

  constructor(private invoiceService: InvoiceService) { }

  public ngOnInit() {
    this.invoiceService.getInvoiceData().subscribe(data_ => {
      if (data_) {
        this.invoiceList = data_.invoiceData;
        this.selectedInvoice = this.invoiceList[0];
      }
    }, (err: Error) => {
      console.error(err);
    })
  }

  public openModal() {
    this.currentOrderIndex = this.invoiceService.getLocalInvoiceList().length + 1;
    this.modalState = !this.modalState;
  }

  public onModalClose(modalState: boolean) {
    this.modalState = modalState;
  }

  public onSelectedInvoice(selectedInvoice: Invoice) {
    this.selectedInvoice = selectedInvoice;
  }
}

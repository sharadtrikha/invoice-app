import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceComponent } from './invoice-list/invoice/invoice.component';
import { ModalComponent } from './modal/modal.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { TableComponent } from './table/table.component';
import { CustomDatePipe } from './date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceListComponent,
    InvoiceDetailComponent,
    InvoiceComponent,
    ModalComponent,
    CreateInvoiceComponent,
    TableComponent,
    CustomDatePipe
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

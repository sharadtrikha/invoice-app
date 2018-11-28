import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'datePipe'
})
export class CustomDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }

  transform(value: number, args?: any): string {
    let currentDate = new Date();
    let inputDate = new Date(value);
    if ((currentDate.getDate() === inputDate.getDate()) &&
      (currentDate.getMonth() === inputDate.getMonth()) &&
      (currentDate.getFullYear() === inputDate.getFullYear())) {
      const res_ = (this.datePipe.transform(value, 'shortTime') + ' - Today')
      return res_;
    } else {
      return this.datePipe.transform(value, 'h:mm a - M/d/yy');
    }
  }

}

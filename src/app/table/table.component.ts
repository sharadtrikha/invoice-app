import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    @Input('columns-name') columns: Array<string> = []; //depicts total number of columns
    @Input('table-data') tableContent: Array<{}> = []; // depicts data for row and column where each object in array represents single row
    @Input('custom-css') customCss: string; // incase component consumer wants to alter the default styling, class names can be send as an Input 

    constructor() { }

    ngOnInit() {
       
    }

    //method deceids what should be the flex-basis of each cell(header cell & row cell) in a table 
    getFlexBasis() {
        return !this.customCss ? 100 / this.columns.length : null;
    }

}

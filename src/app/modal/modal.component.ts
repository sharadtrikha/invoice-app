import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input('modal-header') modalHeader: string = '';
  @Input('sub-modal-header') subModalHeader: string = '';
  @Output('close-modal') closeModal$: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public closeModal() {
    this.closeModal$.emit(true);
  }

}

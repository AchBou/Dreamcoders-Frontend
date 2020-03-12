import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { RubriqueComponent } from '../rubrique/rubrique.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private modal: NzModalRef) {}
  ngOnInit() {
    console.log("TESTTTT")
  }

  destroyModal(): boolean {
    this.modal.destroy();
    return false;
  }

  confirmRemove():boolean{
    return true;
  }
  add()
  {
    console.log("Add function");
    this.destroyModal();
  }

}

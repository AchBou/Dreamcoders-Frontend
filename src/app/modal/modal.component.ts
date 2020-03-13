import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NgForm } from '@angular/forms';
import { RubriqueService } from '../service/rubrique/rubrique.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private modal: NzModalRef, private rubService: RubriqueService) {}
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

  onSubmitForm(f: NgForm){
    f.value.type = "RBS";
      console.log(f.value);
    this.rubService.addRub(f.value).subscribe(res=>{
      console.log(res);
      this.ngOnInit();
    });
    this.destroyModal();
  }

}

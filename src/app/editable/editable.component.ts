import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css']
})

export class EditableComponent implements OnInit {
  awaitingRubriqueList: Array<Rubrique> = [
   {
     id : null,
     type : null,
     ordre :null,
     enseignant :null,
     designation: null,
   }
   ];
  editCache: { [key: string]: { edit: boolean; data: Rubrique } } = {};
  listOfData: Rubrique[] = [];

  constructor(private modalService: NzModalService){}
  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  showDeleteModal(id: number): void {
     this.modalService.confirm({
       nzTitle: 'Confirmer Suppression',
       nzContent: 'Etes-vous sûr de vouloir supprimer?',
       nzOkText : 'Oui',
       nzOkType : 'danger',
       nzOnOk: () => this.remove(id),
       nzOnCancel: () => console.log('Cancel'),
     });
   }

   remove(id: any) :void {
     //this.awaitingRubriqueList.push(this.listOfData[id]);
      this.listOfData.splice(id, 1);

  }

  ngOnInit(): void {
    for (let i = 0; i < 5; i++) {
      this.listOfData.push({
        id: i,
        type:'string'+i,
        ordre:i+1,
        enseignant:null,
        designation:'string'+i,

      });
    }
    this.updateEditCache();
  }
}

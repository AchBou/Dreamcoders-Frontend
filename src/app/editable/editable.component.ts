import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { RubriqueService } from './rubrique.service';
import { NgForm } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css']
})

export class EditableComponent implements OnInit {
  isVisible = false;


  //editCache: { [key: number]: { edit: boolean; data: Rubrique } } = {};
  editCache: { edit: boolean; data: Rubrique }[] = [];
  listOfData: Rubrique[] = [];
  i=0;

  constructor(private modalService: NzModalService, public RubService : RubriqueService){}

  /* addRow(): void {

    this.listOfData = [
      ...this.listOfData,
      {
        id : null,
        type : ' ',
        ordre :0,
        enseignant :null,
        designation: ' ',
      }
    ];
    this.i++;
  } */

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const ruId = this.editCache[id].data.idRubrique;
    const index = this.listOfData.findIndex(item => item.idRubrique === ruId);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: number): void {
    const rub = this.editCache[id].data;
    console.log(rub);
    const index = this.listOfData.findIndex(item => item.idRubrique === rub.idRubrique);
    this.listOfData[index]= this.editCache[id].data;

    this.editCache[id].edit = false;

    this.RubService.updateRub(rub).subscribe(res=>{
      if(res){
        this.updateEditCache()
        }
        else{
          this.showErrorModal('Cette rubrique est déjà utilisée');
      }
    },err=>{}, )
  }

  updateEditCache(): void {
    /*this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });*/
    this.listOfData.forEach(item => {
      this.editCache.push({edit: false, data: item});
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

   handleCancel(): void {
     this.isVisible = false;
   }

   showErrorModal(message:string):void{
     this.modalService.error({
       nzTitle: 'Erreur',
       nzContent : message,
       nzOnOk : () => this.handleCancel()
     });
   }

   remove(id: number) :void {
     //this.awaitingRubriqueList.push(this.listOfData[id]);
     const ruId = this.editCache[id].data;
     this.RubService.deleteRub(ruId.idRubrique).subscribe(res=>{
       if(res){
         this.listOfData = this.listOfData.filter(d => d.idRubrique !== ruId.idRubrique);
         this.updateEditCache()
         }
         else{
           this.showErrorModal('Cette rubrique est déjà utilisée');
       }
     },err=>{}, )
      // this.listOfData.splice(id, 1);
     //  this.updateEditCache();
  }

  showCreateModal(): void {
     this.isVisible=true;
   }

  destroyModal(): void {
        this.isVisible=false;
        }

confirmRemove():boolean{
          return true;
        }

onSubmitForm(f: NgForm){
          f.value.type = "RBS";
            console.log(f.value);
          this.RubService.addRub(f.value).subscribe(res=>{
            console.log(res);
            this.ngOnInit();
          });
          this.destroyModal();
        }

  public ngOnInit(): void {
    this.RubService.getRubrique().subscribe(response=>{
      this.listOfData = response;
    }, error=>{},
    ()=>{ this.updateEditCache(); }
    )

  }
}

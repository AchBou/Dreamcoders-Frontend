import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ModalComponent } from '../modal/modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RubriqueService } from './rubrique.service';



@Component({
  selector: 'app-rubrique',
  templateUrl: './rubrique.component.html',
  styleUrls: ['./rubrique.component.css']
})
export class RubriqueComponent implements OnInit {
  rubriqueList: Array<Rubrique> = [
  {
    id : 1,
    type : 'type1',
    ordre :1,
    enseignant :null,
    designation: 'evaluation'
  },
  {
    id : 2,
    type : 'type2',
    ordre :2,
    enseignant :null,
    designation: 'evaluation'
  }];

 awaitingRubriqueList: Array<Rubrique> = [
  {
    id : null,
    type : null,
    ordre :null,
    enseignant :null,
    designation: null,
  }
  ];

  editField: string;
  isVisible = false;
  isConfirmLoading = false;
  Rubriques:Rubrique [];

  constructor(private app:AppComponent,private modalService: NzModalService, private RubService : RubriqueService) { }

  ngOnInit() {
    this.app.setTitle('Liste des rubriques');
    this.RubService.getRubrique().subscribe(res=>console.log(res));

    }

  //displayedColumns: string[] = ['id', 'type', 'ordre', 'enseignant','designation','Action'];
  //dataSource = new MatTableDataSource(rubriqueList);

 showCreateModal(): void {
    this.modalService.create({
      nzContent: ModalComponent
    });
  }

  showUpdateteModal(): void {
     this.modalService.create({
       nzTitle: 'Confirmer modification',
       nzContent: ModalComponent
          });
   }

   showDeleteModal(id: number): void {
      this.modalService.confirm({
        nzTitle: 'Confirmer Suppression',
        nzContent: ModalComponent,
        nzOkText : 'Oui',
        nzOkType : 'danger',
        nzOnOk: () => this.remove(id),
        nzOnCancel: () => console.log('Cancel'),
      });
    }

    showErrorModal():void{
      this.modalService.error({
        nzTitle: 'Erreur',
        nzContent :'Action impossible',
        nzOnOk : () => this.handleCancel()
      });
    }

  handleOk(): void {
      this.isConfirmLoading = true;
      setTimeout(() => {
        this.isVisible = false;
        this.isConfirmLoading = false;
      }, 3000);
    }

    handleCancel(): void {
      this.isVisible = false;
    }

 //Editable row
 updateList(id: number, property: any, event: any) :void {
       const editField = event.target.textContent;
       this.rubriqueList[id][property] = editField;
     }
//supprimer une ligne
      remove(id: any) :void {
         //this.awaitingRubriqueList.push(this.rubriqueList[id]);
         this.rubriqueList.splice(id, 1);

     }
//Ajouter une ligne dans la table
     add() :void{
       if (this.awaitingRubriqueList.length > 0) {
         let rubrique = this.awaitingRubriqueList[0];
         this.rubriqueList.push(rubrique);
         this.awaitingRubriqueList.splice(0, 1);
       }
     }

     changeValue(id: number, property: any, event: any) :void{
       this.editField = event.target.textContent;

     }





 }

import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgForm, Validators, FormControl, FormGroup } from '@angular/forms';
import { RubriqueService } from '../service/rubrique/rubrique.service';

@Component({
  selector: 'app-rubrique',
  templateUrl: './rubrique.component.html',
  styleUrls: ['./rubrique.component.css']
})

export class RubriqueComponent implements OnInit {
  isVisible = false;
  form = new FormGroup({
  OrdreControl: new FormControl('', Validators.required),
  DesControl: new FormControl('', Validators.required)
});


  //editCache: { [key: number]: { edit: boolean; data: Rubrique } } = {};
  editCache: { edit: boolean; data: Rubrique }[] = [];
  listOfData: Rubrique[] = [];
  i=0;

  constructor(private modalService: NzModalService, public RubService : RubriqueService){}


  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    console.log(this.editCache[id].data);
    const ruId = this.editCache[id].data;
    const index = this.listOfData.findIndex(item => item.idRubrique === ruId.idRubrique);
    this.editCache[id].edit= false;
    this.editCache[id].data= this.listOfData[index];
  }

  saveEdit(id: number): void {
    if(this.editCache[id].data.designation != '' && this.editCache[id].data.ordre != null)
    {
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
          this.showErrorModal('Cette rubrique est déjà utilisée dans une évaluation ');
      }
    })
  }
  else
    this.showErrorModal('Les champs sont obligatoires');
  }

  updateEditCache(): void {
    this.editCache = [];
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

   showErrorModal(s : string):void{
     this.modalService.error({
       nzTitle: 'Erreur',
       nzContent : s,
       nzOnOk : () => {this.handleCancel();}
     });
   }

   showError(s : string):void{
     this.modalService.error({
       nzTitle: 'Erreur',
       nzContent : s,
       nzOnOk : () => {this.handleCancel(); this.showCreateModal();}
     });
   }

   remove(id: number) :void {
     const ruId = this.editCache[id].data;
     this.RubService.deleteRub(ruId.idRubrique).subscribe(res=>{
       if(res){
         this.listOfData = this.listOfData.filter(d => d.idRubrique !== ruId.idRubrique);
         this.updateEditCache();
         }
         else{
           this.showErrorModal('Cette rubrique est déjà utilisée dans une évaluation');
       }
     })

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
        if(f.value.ordre != '' && f.value.designation != ''){
          this.RubService.addRub(f.value).subscribe(res=>{
            console.log(res);
            this.ngOnInit();
          });
          this.destroyModal();
        }
        else{
          this.showError('Remplissez les champs !');
        }

        }


  editIsAuthorized(id : number){
    const ruId = this.editCache[id].data.idRubrique;
    this.RubService.ifLinked(ruId).subscribe(res=>{
      if(!res)
        {console.log (res);this.startEdit(id);}
      else
        {this.showErrorModal('Cette rubrique est déjà utilisée dans une évaluation');
         }
    }
  )
  }

  DeleteIsAuthorized(id : number){
    const ruId = this.editCache[id].data.idRubrique;
    this.RubService.ifLinked(ruId).subscribe(res=>{
      if(!res)
        {console.log (res);this.showDeleteModal(id);}
      else
        {this.showErrorModal('Cette rubrique est déjà utilisée dans une évaluation');}
    })
  }

  public ngOnInit(): void {
    this.RubService.getRubrique().subscribe(response=>{
      this.listOfData = response;
    }, error=>{},
    ()=>{ this.updateEditCache(); }
    )

  }
}

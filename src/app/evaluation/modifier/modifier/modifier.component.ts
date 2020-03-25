import { Component, OnInit, Input } from '@angular/core';
import { RubriqueService } from 'src/app/service/rubrique/rubrique.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {
  private _route: ActivatedRoute;

  @Input() evaluationToEdit: Evaluation = null;
  rubriques: Rubrique[];

  rubriquesEval: any[] = [];
  
  selectedUser: Rubrique = null;
 
  constructor( private rubriqueService: RubriqueService, private message: NzMessageService) {}


  ngOnInit() {
    this.rubriqueService.getRubrique().subscribe((data) => {this.rubriques = data;});
  }
  
  deleteRubriqueEval(rubriqueSupprimer: Rubrique){
    console.log(rubriqueSupprimer);
    this.rubriquesEval = this.rubriquesEval.filter(d => d.idRubrique !== rubriqueSupprimer.idRubrique);
    this.message.create("success","Rubrique supprimée de l'évaluation");

  }
  ajouterRubriqueEval(){
    if(this.selectedUser == null){
    this.message.create("error","Le champs est vide");
      }
      else{
        console.log(this.selectedUser);
        this.rubriquesEval.push(this.selectedUser);
        this.message.create("success","Rubrique ajoutée à l'évaluation");
        this.selectedUser = null;
      }
    
  }
  activer(rubrique : any){
    if(rubrique.active){
      rubrique.active = false;
    }
    else {
    rubrique.active = true;
    this.rubriquesEval.forEach((rub) => {
      if(rub != rubrique){
        rub.active = false;
      }
    })
  }
  }

  ayoubhere(rubrique: any)
  {
    this.rubriquesEval.forEach((rub) => {
      if(rub = rubrique){
        rub.active = true;
      }
    })
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { RubriqueService } from 'src/app/service/rubrique/rubrique.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from 'src/app/communication.service';
import { RubriqueEvalService } from 'src/app/service/rubriqueEval/rubrique-eval.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {

  evaluationToEdit: Evaluation;
  rubriques: Rubrique[];

  rubriquesEval: any[] = [];
  rubriqueEvalAdd : RubriqueEvaluation = {rubrique: null, evaluation: this.evaluationToEdit};
  selectedUser: Rubrique = null;
 
  constructor(private router : Router,private rubriqueEvalService: RubriqueEvalService,private rubriqueService: RubriqueService, private message: NzMessageService, private app: AppComponent) {}


  ngOnInit() {
    this.evaluationToEdit=history.state;
    this.app.setTitle("Évaluation: "+this.evaluationToEdit.designation);
    this.rubriqueService.getRubrique().subscribe((rubriques) => this.rubriques = rubriques);
    this.rubriqueEvalService
    .getRubriquesEval(this.evaluationToEdit.idEvaluation)
    .subscribe((rubs) =>{ this.rubriquesEval = rubs;
    console.log(this.rubriquesEval);
  console.log(this.evaluationToEdit);});
  }
  ngOnDestroy(){
    this.app.setTitle("");
  }
  
  deleteRubriqueEval(rubriqueSupprimer: Rubrique){
    this.rubriqueEvalService.deleteRubriqueEval(this.evaluationToEdit.idEvaluation,rubriqueSupprimer.idRubrique).subscribe((ev) =>{
      console.log(rubriqueSupprimer);
      this.rubriquesEval = this.rubriquesEval.filter(d => d.idRubrique !== rubriqueSupprimer.idRubrique);
      this.message.create("success","Rubrique supprimée de l'évaluation");
    })
    

  }
  ajouterRubriqueEval(){
    if(this.selectedUser == null){
    this.message.create("error","Le champs est vide");
      }
      else{
        console.log(this.selectedUser);
        this.rubriqueEvalAdd.evaluation = this.evaluationToEdit;
        this.rubriqueEvalAdd.rubrique = this.selectedUser;
        console.log(this.rubriqueEvalAdd);
        this.rubriqueEvalService.ajouterRubriqueEval(this.evaluationToEdit.idEvaluation,this.selectedUser.idRubrique).subscribe((rubriqueeval) => {
          this.rubriquesEval.push(this.selectedUser);
          this.message.create("success","Rubrique ajoutée à l'évaluation");
          this.selectedUser = null;
        })

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
  publier(){
    this.rubriqueEvalService.publier(this.evaluationToEdit).subscribe((eva) => {this.message.create("success","évaluation publiée");
      this.router.navigateByUrl('/evaluation');
    });
  }
  sauvegarder(){
    this.message.create("success","évaluation sauvegardée");
    this.router.navigateByUrl('/evaluation');
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
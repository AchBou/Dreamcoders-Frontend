import { Component, OnInit} from '@angular/core';
import { RubriqueService } from 'src/app/service/rubrique/rubrique.service';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import {  Router } from '@angular/router';
import { RubriqueEvalService } from 'src/app/service/rubriqueEval/rubrique-eval.service';
import { RubriqueEvaluation } from 'src/app/model/rubrique-evaluation';


@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {

  evaluationToEdit: any;
  rubriques: Rubrique[];

  rubriquesEval: any[] = [];
  rubriqueEvalAdd : RubriqueEvaluation =  new RubriqueEvaluation();
  selectedUser: Rubrique = null;
 
  constructor(private notification: NzNotificationService,private router : Router,private rubriqueEvalService: RubriqueEvalService,private rubriqueService: RubriqueService, private message: NzMessageService) {}



  ngOnInit() {
    this.evaluationToEdit=history.state;
    this.rubriqueService.getRubrique().subscribe((rubriques) => this.rubriques = rubriques);
    this.rubriqueEvalService
    .getRubriquesEval(this.evaluationToEdit.idEvaluation)
    .subscribe((rubs) =>{ this.rubriquesEval = rubs;
    console.log(this.rubriquesEval);
  console.log(this.evaluationToEdit);});

  }

  deleteRubriqueEval(rubriqueSupprimer: Rubrique){
    this.rubriqueEvalService.deleteRubriqueEval(this.evaluationToEdit.idEvaluation,rubriqueSupprimer.idRubrique).subscribe((ev) =>{
      console.log(rubriqueSupprimer);
      this.rubriquesEval = this.rubriquesEval.filter(d => d.idRubrique !== rubriqueSupprimer.idRubrique);
      this.notification.create(
        'success',
        'Succès',
        "Rubrique supprimée de l'évaluation.",
      );
    })
    

  }
  ajouterRubriqueEval(){
    if(this.selectedUser == null){
    this.message.create("error","Le champs est vide.");
      }
      else{
        console.log(this.selectedUser);
        this.rubriqueEvalAdd.evaluation = this.evaluationToEdit;
        this.rubriqueEvalAdd.rubrique = this.selectedUser;
        console.log(this.rubriqueEvalAdd);
        this.rubriqueEvalService.ajouterRubriqueEval(this.evaluationToEdit.idEvaluation,this.selectedUser.idRubrique).subscribe((rubriqueeval) => {
          this.rubriquesEval.push(this.selectedUser);
          this.notification.create(
            'success',
            'Succès',
            "Rubrique ajoutée à l'évaluation.",
          );
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

    }, reponse =>{ this.notification.create(
      'error',
      'Échec de publication.',
      reponse.error.message,
    ); });
  }
  sauvegarder(){
    this.notification.create(
      'success',
      'Succès',
      'Évaluation sauvegardée.',
    );
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

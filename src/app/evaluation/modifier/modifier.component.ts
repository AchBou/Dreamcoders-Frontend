import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { RubriqueService } from 'src/app/service/rubrique/rubrique.service';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { CommunicationService } from 'src/app/communication.service';
import { RubriqueEvalService } from 'src/app/service/rubriqueEval/rubrique-eval.service';
import { EvaluationQuestionComponent } from '../question/question.component';
import { AppComponent } from 'src/app/app.component';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionService } from 'src/app/service/question/question.service';
import { EvaluationService } from 'src/app/service/evaluation/evaluation.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {

  evaluationToEdit: Evaluation;
  rubriques: Rubrique[];
  questionsource: MatTableDataSource<Question>;
  rubriquesEval: RubriqueEvaluation[] = [];
  rubriqueEvalAdd : RubriqueEvaluation = {idRubriqueEvaluation: 0, rubrique: null, evaluation: this.evaluationToEdit, questionEvaluation: null};
  selectedUser: Rubrique = null;

  active: RubriqueEvaluation = null;

  @ViewChildren(EvaluationQuestionComponent) rubriqueQuestion : QueryList<EvaluationQuestionComponent>
 
  constructor(private notification: NzNotificationService, private router : Router,private rubriqueEvalService: RubriqueEvalService,private rubriqueService: RubriqueService, private message: NzMessageService, private qservice: QuestionService,  private app: AppComponent, private evalService: EvaluationService) {
    this.evaluationToEdit=history.state;
  }

  ngOnInit() {
    this.app.setTitle("Évaluation : "+this.evaluationToEdit.designation);
    this.rubriqueService.getRubrique().subscribe((rubriques) => this.rubriques = rubriques);
    this.getQuestions();
    this.rubriqueEvalService
    .getRubriquesEval(this.evaluationToEdit.idEvaluation)
    .subscribe((rubs) =>{ this.rubriquesEval = rubs;});
  }
  ngAfterViewInit(){
    // print array of QuestionEvaluation objects
    console.log(this.rubriqueQuestion.toArray());
  }

  ngOnDestroy(){
    this.app.setTitle("");
  }
  getQuestions() {
    this.qservice.getQuestions().subscribe(res => {
      this.questionsource = new MatTableDataSource(res);

    });
  }
  showQuestions(){
    return this.questionsource;
  }

  deleteRubriqueEval(rubriqueSupprimer: RubriqueEvaluation){
    this.rubriqueEvalService.deleteRubriqueEval(rubriqueSupprimer.idRubriqueEvaluation).subscribe((ev) =>{
      console.log(rubriqueSupprimer);
      this.rubriquesEval = this.rubriquesEval.filter(d => d.idRubriqueEvaluation !== rubriqueSupprimer.idRubriqueEvaluation);
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
          this.rubriquesEval.push(rubriqueeval);
          this.notification.create(
            'success',
            'Succès',
            "Rubrique ajoutée à l'évaluation.",
          );
          this.selectedUser = null;
        })

      }

  }
  activer(rubrique : RubriqueEvaluation){
    if(this.active == rubrique){
      this.active = null;
    }
    else {
      this.active = rubrique;
    }
  }
  publier(){
    this.rubriqueEvalService.publier(this.evaluationToEdit).subscribe((eva) => {
        this.evalService.reloadData(eva);
        this.notification.create(
          'success',
          'Évaluation publiée',
          ''       
        );
        this.router.navigateByUrl('/evaluation');
    }, reponse =>{ this.notification.create(
      'warning',
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

  showAddQuestion(index){
    this.rubriqueQuestion.toArray()[index].showAddModal();
  }
  
}

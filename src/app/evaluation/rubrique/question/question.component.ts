import { Component, OnInit } from '@angular/core';
import { QuestionEva } from 'src/app/model/question_evaluation';

@Component({
  selector: 'app-evaluation-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class EvaluationQuestionComponent implements OnInit {
  
  lq: QuestionEva[];
  questions: Question[] = [{idQuestion: 342, intitule : "contenu de support", type :"QUS", enseignant :null, qualificatif : { idQualificatif :2, maximal : "Faible", minimal:"Fort"}, updatable: false},
                            {idQuestion:1,intitule:"Contenus",type:"QUS",enseignant:null,qualificatif:{idQualificatif:41,maximal:"Mauvaise",minimal:"Tres Bonne"}, updatable: false},
                            {idQuestion:2,intitule:"Intérêt",type:"QUS",enseignant:null,qualificatif:{idQualificatif:24,maximal:"Insuffisant",minimal:"Excessif"}, updatable: false}]
  displayedColumns: string[] = ['Intitule', 'Qualificatif', 'action'];

  constructor() { }

  ngOnInit() {
    this.lq= [{idQuestionEvaluation: 1, ordre: 1, question: this.questions[0] },
              {idQuestionEvaluation: 2, ordre: 2, question: this.questions[1] },
              {idQuestionEvaluation: 3, ordre: 3, question: this.questions[2] }]
    
    
  }

  remove(idx: any) {

  }

}

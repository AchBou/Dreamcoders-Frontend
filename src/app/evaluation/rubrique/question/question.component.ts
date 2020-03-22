import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class EvaluationQuestionComponent implements OnInit {
  
  lq: any;
  displayedColumns: string[] = ['Intitule', 'Qualificatif', 'action'];

  constructor() { }

  ngOnInit() {
    this.lq= [{idQuestion: 342, intitule : "contenu de support", type :"QUS", enseignant :null, qualificatif : { idQualificatif :2, maximal : "Faible", minimal:"Fort"}},
              {idQuestion:1,intitule:"Contenus",type:"QUS",enseignant:null,qualificatif:{idQualificatif:41,maximal:"Mauvaise",minimal:"Tres Bonne"}},
              {idQuestion:2,intitule:"Intérêt",type:"QUS",enseignant:null,qualificatif:{idQualificatif:24,maximal:"Insuffisant",minimal:"Excessif"}}];
  }

  remove(idx: any) {

  }

}

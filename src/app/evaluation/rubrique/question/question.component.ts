import { Component, OnInit } from '@angular/core';
import { QuestionEva } from 'src/app/model/question_evaluation';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { MatTableDataSource } from '@angular/material/table';
import { QuestionService } from 'src/app/service/question/question.service';

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
  modalColumns: string[] = ['select', 'Intitule', 'Qualificatif'];
  datasource: MatTableDataSource<Question>;
  deleteChache: QuestionEva[] = [];
  createCache: QuestionEva[] = [];
  modalCache: Question[]= [];
  isVisible: boolean = false;
  selection = new SelectionModel<QuestionEva>(true, []);

  constructor(private qservice: QuestionService) { }

  ngOnInit() {
    this.lq= [{idQuestionEvaluation: 1, ordre: 1, question: this.questions[0] },
              {idQuestionEvaluation: 2, ordre: 2, question: this.questions[1] },
              {idQuestionEvaluation: 3, ordre: 3, question: this.questions[2] }];
     this.showQuestions();
  }
  showQuestions() {
    this.qservice.getQuestions().subscribe(res => {
      this.datasource = new MatTableDataSource(res);

    });
  }

  remove(idx: any) {
    const index = this.lq.findIndex((q)=>{ return q.idQuestionEvaluation==idx});
    const cachIndex = this.createCache.findIndex((q)=>{ return q.idQuestionEvaluation==idx})
    console.log(index);    
    this.deleteChache.push(this.lq[index]);
    this.lq = this.lq.slice(0,index).concat(this.lq.slice(index+1));
    if(cachIndex!=-1){
      this.createCache.splice(cachIndex);
    }
  }

  showAddModal(){
    this.isVisible=true;
  }
  destroyModal(){
    this.isVisible=false
    this.modalCache.splice(0);
    this.selection.clear();
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  handleChange(e, el: Question){
    const index = this.modalCache.findIndex( q => q.idQuestion==el.idQuestion);
    if(e.checked){
      this.modalCache.push(el);
    }
    else{
      this.modalCache.splice(index,1);
    }
    console.log(this.modalCache);
    
  }
  getMaxId(){
    let max = 0;
    this.lq.forEach(el=>{
      if(el.idQuestionEvaluation>max){ max= el.idQuestionEvaluation; }
    });
    return max;
  }
  onSubmit(){
    this.modalCache.forEach((q,idx)=>{
      this.createCache.push({idQuestionEvaluation:this.getMaxId()+idx+1, ordre: 0, question: q});
      this.lq = this.lq.concat({idQuestionEvaluation:this.getMaxId()+idx+1, ordre: 0, question: q});
    });
    console.log(this.selection);
    console.log(this.lq);
    setTimeout(()=>this.destroyModal());
  }
}

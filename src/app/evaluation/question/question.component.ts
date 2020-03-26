import { Component, OnInit } from '@angular/core';
import { QuestionEva } from 'src/app/model/question_evaluation';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { MatTableDataSource } from '@angular/material/table';
import { QuestionService } from 'src/app/service/question/question.service';
import { QuestionEvaluationService } from 'src/app/service/questionEvaluation/question-evaluation.service';

@Component({
  selector: 'app-evaluation-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class EvaluationQuestionComponent implements OnInit {
  
  idRubriqueEvaluation: number = 1;
  lq: QuestionEva[];
  questions: Question[] = [{idQuestion: 342, intitule : "contenu de support", type :"QUS", enseignant :null, qualificatif : { idQualificatif :2, maximal : "Faible", minimal:"Fort"}, updatable: false},
                            {idQuestion:1,intitule:"Contenus",type:"QUS",enseignant:null,qualificatif:{idQualificatif:41,maximal:"Mauvaise",minimal:"Tres Bonne"}, updatable: false},
                            {idQuestion:2,intitule:"Intérêt",type:"QUS",enseignant:null,qualificatif:{idQualificatif:24,maximal:"Insuffisant",minimal:"Excessif"}, updatable: false}]
  displayedColumns: string[] = ['Intitule', 'Qualificatif', 'action'];
  modalColumns: string[] = ['select', 'Intitule', 'Qualificatif'];
  datasource: MatTableDataSource<Question>;
  deleteCache: QuestionEva[] = [];
  createCache: QuestionEva[] = [];
  modalCache: Question[]= [];
  isVisible: boolean = false;
  selection = new SelectionModel<QuestionEva>(true, []);

  constructor(private qservice: QuestionService, private qeService: QuestionEvaluationService) { }

  ngOnInit() {
    this.lq= [{idQuestionEvaluation: 1, idRubriqueEvaluation: 1, ordre: 1, question: this.questions[0] },
              {idQuestionEvaluation: 2, idRubriqueEvaluation: 1, ordre: 2, question: this.questions[1] },
              {idQuestionEvaluation: 3, idRubriqueEvaluation: 1, ordre: 3, question: this.questions[2] },
              {idQuestionEvaluation: 51, ordre: 0, question: {
                  idQuestion: 4,
                  intitule: "Support de cours",
                  type: "QUS",
                  enseignant: null,
                  qualificatif: {
                    idQualificatif: 3,
                    maximal: "Insatisfaisant",
                    minimal: "Satisfaisant"
                  },
                  updatable: false
                },idRubriqueEvaluation: 1
              }];
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
    if(index!=-1){
      console.log(index);    
      this.deleteCache.push(this.lq[index]);
      this.lq = this.lq.slice(0,index).concat(this.lq.slice(index+1));
    }
    if(cachIndex!=-1){
      this.createCache.splice(cachIndex, 1);
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
      this.createCache.push({idQuestionEvaluation:this.getMaxId()+idx+1, idRubriqueEvaluation: this.idRubriqueEvaluation, ordre: 0, question: q});
      //this.lq = this.lq.concat({idQuestionEvaluation:this.getMaxId()+idx+1, idRubriqueEvaluation: this.idRubriqueEvaluation, ordre: 0, question: q});
    });
    console.log(this.selection);
    console.log(this.lq);
    setTimeout(()=>this.destroyModal());
  }
  save(){
    if(this.createCache.length){
      this.qeService.addQuestion(this.createCache).subscribe(res=>{
        if(res.status==200){
          console.log(res.entity);
          this.lq = this.lq.concat(res.entity);
          this.createCache.splice(0);
        }
        else{
          console.log(res.entity);
        }
      });
    }
    if(this.deleteCache.length){
      this.qeService.deleteQuestions(this.deleteCache).subscribe(res=>{
        if(res.status==200){
          this.deleteCache.splice(0);
        }
        else{
          console.log(res.entity);
        }
      });
    }
  }
}

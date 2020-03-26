import { Component, OnInit, Input } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { MatTableDataSource } from '@angular/material/table';
import { QuestionService } from 'src/app/service/question/question.service';
import { QuestionEvaluationService } from 'src/app/service/questionEvaluation/question-evaluation.service';
import { ModifierComponent } from '../modifier/modifier.component';

@Component({
  selector: 'app-evaluation-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class EvaluationQuestionComponent implements OnInit {
  
  @Input("questionEvaluations")
  lq: QuestionEva[] = [];
  @Input("idRubEva")
  idRubriqueEvaluation: number;

  displayedColumns: string[] = ['Intitule', 'Qualificatif', 'action'];
  modalColumns: string[] = ['select', 'Intitule', 'Qualificatif'];
  datasource: MatTableDataSource<Question>;
  deleteCache: QuestionEva[] = [];
  createCache: QuestionEva[] = [];
  modalCache: Question[]= [];
  isVisible: boolean = false;
  selection = new SelectionModel<QuestionEva>(true, []);

  constructor(private qeService: QuestionEvaluationService, private page: ModifierComponent) { }

  ngOnInit() {
  }

  remove(idx: any) {
    const index = this.lq.findIndex((q)=>{ return q.idQuestionEvaluation==idx});
    const cachIndex = this.createCache.findIndex((q)=>{ return q.idQuestionEvaluation==idx})
    if(index!=-1){
      console.log(index);    
      this.deleteCache.push(this.lq[index]);
      this.lq = this.lq.slice(0,index).concat(this.lq.slice(index+1));
      this.save();
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
    this.save();
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

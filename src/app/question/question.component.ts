import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionService } from '../service/question/question.service';
import { QualificatifService } from '../service/qualificatif/qualificatif.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  lq:Question[];
  lqua:Qualificatif[];
  constructor(private qservice:QuestionService,private qualiService:QualificatifService) { }

  ngOnInit() {
      this.showQuestions();
      this.listQualificatifs();
  }

  showQuestions(){
    this.qservice.getQuestions().subscribe(res=>{
                                  this.lq=res;
                                  console.log(this.lq);
                                  this.dataSource = new MatTableDataSource(this.lq);
                                });
}

    displayedColumns: string[] = [ 'Intitule','Type','Qualificatif','action'];
    dataSource:any;

    listQualificatifs(){
      this.qualiService.getQualificatifs().subscribe(res=>{
                                    this.lqua=res;
                                    console.log(this.lqua);
                                  });
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    updateField(id: any){
       this.dataSource.data[id].updatable=!this.dataSource.data[id].updatable;
     }

    addField(){
      this.lq.unshift({id: null, type: null, enseignant: null, qualificatif: null,intitule:null,updatable:true});
      this.dataSource = new MatTableDataSource(this.lq);
    }

    add(id: any){
      this.updateField(id);
      console.log(this.lq[id])
    }

    update(){

    }

    remove(id: any) {
       this.qservice.deleteQuestion(id)
        .subscribe(()=>this.showQuestions());
    }
}

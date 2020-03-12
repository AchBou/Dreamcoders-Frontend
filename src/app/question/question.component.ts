import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '../service/question/question.service';
import { QualificatifService } from '../service/qualificatif/qualificatif.service';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  lq:Question[];
  lqua:Qualificatif[];
  qualificatifControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  displayedColumns: string[] = [ 'Intitule','Type','Qualificatif','action'];
  dataSource:any;
  isLoaded=false;
  mode: ProgressSpinnerMode = 'indeterminate';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private qservice:QuestionService,private qualiService:QualificatifService) { }

  ngOnInit() {
      this.showQuestions();
      this.listQualificatifs();
  }

  changeDataSource(){
    this.dataSource = new MatTableDataSource(this.lq);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

    showQuestions(){
      this.qservice.getQuestions().subscribe(res=>{
                                    this.lq=res;
                                    console.log(this.lq);
                                    this.isLoaded=true
                                    this.changeDataSource();
                                  });
    }


    listQualificatifs(){
      this.qualiService.getQualificatifs().subscribe(res=>{
                                    this.lqua=res;
                                    console.log(this.lqua);
                                  });
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    }

    updateField(idx: any){
      console.log(this.lq[idx])
      if(this.lq[idx].idQuestion==null) {
        this.lq.shift();
        this.changeDataSource();
      }
      else if(this.lq[idx].idQuestion!=null) this.dataSource.data[idx].updatable=!this.dataSource.data[idx].updatable;
     }

    addField(){
      this.lq.unshift({idQuestion: null, type: "QUS", enseignant: null, qualificatif: null,intitule:null,updatable:true});
      this.changeDataSource();
      this.paginator.firstPage();
    }

    confirm(){
      console.log("confirm")
    }

    cancel(){
      console.log('cancel')
    }

    edit(idx: any){
        if(this.lq[idx].idQuestion==null) this.add(idx);
        else if(this.lq[idx].idQuestion!=null) this.update(idx);
    }

    add(idx: any){
      this.qservice.addQuestion(this.lq[idx])
          .subscribe(()=>this.showQuestions());
    }

    update(idx: any){
      this.qservice.updateQuestion(this.lq[idx])
          .subscribe(()=>this.showQuestions());
    }

    remove(idx: any) {
       this.qservice.deleteQuestion(idx)
        .subscribe(()=>this.showQuestions());
    }
}

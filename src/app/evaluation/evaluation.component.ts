import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { EvaluationService } from '../service/evaluation/evaluation.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommunicationService } from '../communication.service';
import { Router } from '@angular/router';
import { RubriqueEvalService } from '../service/rubriqueEval/rubrique-eval.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  evaluations: Evaluation[];
  isVisible : boolean = false;
  isModifVisible: boolean = false;
  isLoaded = false;
  displayedColumns: string[] = ['designation','enseignant','formation','promotion','etat','debReponse','finReponse','uEns','uConst', 'action'];
  dataSource: any;
  mode: ProgressSpinnerMode = 'indeterminate';
  editedEval: Evaluation = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(){
    this.showEvaluations();
    this.app.setTitle("Liste des évaluations");
  }

  showEvaluations() {
    this.evaluationService.getAllEval().subscribe((res) => {this.evaluations = res;
    console.log(this.evaluations);
    this.isLoaded = true
    this.changeDataSource();});
  }
 constructor(private message: NzMessageService,private rubriqueEvalService: RubriqueEvalService,private router : Router,private modalService: NzModalService, private evaluationService: EvaluationService, private app:AppComponent){}
  

  confirm() {
    console.log("confirm")
  }

  cancel() {
    console.log('cancel')
  }
  publier(evaluation: Evaluation){
    this.rubriqueEvalService.publier(evaluation).subscribe((eva) => {this.message.create("success","évaluation publiée");
      this.router.navigateByUrl('/evaluation');
    });
  }


  changeDataSource() {
    this.dataSource = new MatTableDataSource(this.evaluations);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(){
    this.app.setTitle("");
  }

  showModal(): void {
    this.isVisible = true;
  }
  modifier(evaluation: Evaluation): void {
    this.editedEval = evaluation; 
    console.log(this.editedEval);
    this.router.navigateByUrl('/modifierevaluation', { state: this.editedEval });


  }


  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Bla bla ...',
      nzOkText: 'OK',
      nzCancelText: 'Cancel'
    });
  }

  hideModal(): void {
    this.isVisible = false;
    this.isModifVisible = false;
  }

}

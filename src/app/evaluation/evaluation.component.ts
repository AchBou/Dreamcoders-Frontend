import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { EvaluationService } from '../service/evaluation/evaluation.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
 constructor(private modalService: NzModalService, private evaluationService: EvaluationService, private app:AppComponent){}
  

  confirm() {
    console.log("confirm")
  }

  cancel() {
    console.log('cancel')
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
  showModalModification(evaluation: Evaluation): void {
    this.editedEval = evaluation; 
    this.isModifVisible = true;
    console.log(this.editedEval);

  }
  publier(){
    
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

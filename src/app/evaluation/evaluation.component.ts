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
  isLoaded = false;
  displayedColumns: string[] = ['designation','enseignant','formation','promotion','etat','debReponse','finReponse','uEns','uConst', 'action'];
  dataSource: any;
  mode: ProgressSpinnerMode = 'indeterminate';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

 constructor(private evaluationService: EvaluationService, private app:AppComponent){}

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

  hideModal(): void {
    this.isVisible = false;
  }

}

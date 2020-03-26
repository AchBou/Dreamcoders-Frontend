import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '../service/question/question.service';
import { QualificatifService } from '../service/qualificatif/qualificatif.service';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AppComponent } from '../app.component';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  lq: Question[];
  lqua: Qualificatif[];
  qualificatifControl = new FormControl('', Validators.required);
  intituleFormControl = new FormControl('', Validators.required);
  displayedColumns: string[] = ['Intitule', 'Qualificatif', 'action'];
  dataSource: any;
  isLoaded = false;
  newQualif = null;
  mode: ProgressSpinnerMode = 'indeterminate';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private qservice: QuestionService,
    private qualiService: QualificatifService,
    public dialog: MatDialog, private app: AppComponent) { }

  ngOnInit() {
    this.showQuestions();
    this.listQualificatifs();
    this.app.setTitle('Liste des questions standards');

  }
  ngOnDestroy(){
    this.app.setTitle("");
  }
  
  openDialog(msg: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: msg
    });
    dialogRef.afterClosed().subscribe();
  }
  changeDataSource() {
    this.dataSource = new MatTableDataSource(this.lq);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showQuestions() {
    this.qservice.getQuestions().subscribe(res => {
      this.lq = res;
      console.log(this.lq);
      this.isLoaded = true
      this.changeDataSource();
    });
  }


  listQualificatifs() {
    this.qualiService.getQualificatifs().subscribe(res => {
      this.lqua = res;
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


  editUpdate(idx: any) {
    let index = this.paginator.pageIndex == 0 ?  idx : idx + this.paginator.pageIndex * this.paginator.pageSize;
    this.qservice.checkValidity(this.lq[index].idQuestion).subscribe(res => {
      if (!res) {
        this.updateField(idx);
      }
      else {
        this.openDialog('Cette question est déjà évaluée. Elle ne peut pas être modifier!');
      }
    })
  }

  cancelUpdate(idx: any) {


    let index = this.paginator.pageIndex == 0 ?  idx : idx + this.paginator.pageIndex * this.paginator.pageSize;
    if (this.lq[index].idQuestion == null) {
      this.lq.shift();
      this.changeDataSource();
    }
    else{
      this.updateField(idx);
    }
  }


  updateField(idx: any) {
    this.dataSource.data[idx].updatable = !this.dataSource.data[idx].updatable;
  }


  addField() {

    this.lq.unshift({ idQuestion: null, type: "QUS", enseignant: null, qualificatif: { idQualificatif: null, maximal: null, minimal: null }, intitule: null, updatable: true });
    this.changeDataSource();
    this.paginator.firstPage();
  }

  confirm() {
    console.log("confirm")
  }

  cancel() {
    console.log('cancel')
  }

  edit(idx: any) {
  let index = this.paginator.pageIndex == 0 ? idx : idx + this.paginator.pageIndex * this.paginator.pageSize;
    this.lq[index].qualificatif = this.newQualif;
    if (this.lq[index].intitule != null && this.lq[index].qualificatif != null) {
      if (this.lq[index].idQuestion == null) this.add(index);
      else if (this.lq[index].idQuestion != null) this.update(index);
    }
    else {
      this.openDialog('Veuillez renseigner tous les champs obligatoires');
    }
  }

  add(i: any) {

    this.qservice.addQuestion(this.lq[i])
      .subscribe(() => this.showQuestions());
  }

  update(i: any) {

    this.qservice.updateQuestion(this.lq[i])
      .subscribe(() => this.showQuestions());
  }

  remove(idx: any) {
    this.qservice.checkValidity(idx).subscribe(res => {
      if (!res) {
        this.qservice.deleteQuestion(idx)
          .subscribe(() => this.showQuestions());
      }
      else {
        this.openDialog('Cette question est déjà évaluée. Elle ne peut pas être supprimée!');
      }
    })

  }


  changeQualif(event: any) {
    this.newQualif = this.lqua.filter(element => element.idQualificatif == event.value)[0];
  }

}

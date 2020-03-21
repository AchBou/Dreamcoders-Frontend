import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { RubriqueService } from '../service/rubrique/rubrique.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-rubrique',
  templateUrl: './rubrique.component.html',
  styleUrls: ['./rubrique.component.css']
})

export class RubriqueComponent implements OnInit {

  lr: Rubrique[];
  designationFormControl = new FormControl('', Validators.required);
  displayedColumns: string[] = ['Designation', 'action'];
  dataSource: any;
  isLoaded = false;
  mode: ProgressSpinnerMode = 'indeterminate';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public rubService: RubriqueService,
    public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.showRubriques();
  }

  changeDataSource() {
    this.dataSource = new MatTableDataSource(this.lr);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  showRubriques() {
    this.rubService.getRubrique().subscribe(res => {
      this.lr = res;
      console.log(this.lr);
      this.isLoaded = true
      this.changeDataSource();
    });
  }
  openDialog(msg: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: msg
    });
    dialogRef.afterClosed().subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUpdate(idx: any) {
    let index = this.paginator.pageIndex == 0 ? idx : idx + this.paginator.pageIndex * this.paginator.pageSize;
    this.rubService.ifLinked(this.lr[index].idRubrique).subscribe(res => {
      if (!res) {
        this.updateField(idx);
      }
      else {
        this.openDialog('Cette rubrique est déjà évaluée. Elle ne peut pas être modifier!');
      }
    })
  }

  cancelUpdate(idx: any) {
    let index = this.paginator.pageIndex == 0 ? idx : idx + this.paginator.pageIndex * this.paginator.pageSize;
    if (this.lr[index].idRubrique == null) {
      this.lr.shift();
    }
    this.updateField(idx);
  }


  updateField(idx: any) {
    this.dataSource.data[idx].updatable = !this.dataSource.data[idx].updatable;
  }


  addField() {
    this.lr.unshift({ idRubrique: null, ordre: null, type: "RBS", enseignant: null, designation: null, updatable: true });
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
    if (this.lr[index].designation != null) {
      if (this.lr[index].idRubrique == null) this.add(index);
      else if (this.lr[index].idRubrique != null) this.update(index);
    }
    else {
      this.openDialog('Veuillez renseigner tous les champs obligatoires');
    }
  }

  add(idx: any) {
    this.rubService.addRub(this.lr[idx])
      .subscribe(() => this.showRubriques());
  }

  update(idx: any) {
    console.log(this.lr[idx]);

    this.rubService.updateRub(this.lr[idx])
      .subscribe(() => this.showRubriques());
  }

  remove(idx: any) {

    this.rubService.ifLinked(idx).subscribe(res => {
      if (!res) {
        this.rubService.deleteRub(idx)
          .subscribe(() => this.showRubriques());
      }
      else {
        this.openDialog('Cette question est déjà évaluée. Elle ne peut pas être supprimée!');
      }
    })

  }


}

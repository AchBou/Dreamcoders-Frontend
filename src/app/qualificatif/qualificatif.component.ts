import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { QualificatifService } from '../service/qualificatif/qualificatif.service';

@Component({
  selector: 'app-qualificatif',
  templateUrl: './qualificatif.component.html',
  styleUrls: ['./qualificatif.component.css']
})
export class QualificatifComponent implements OnInit {

  lqua: Qualificatif[];
  designationFormControl = new FormControl('', Validators.required);
  displayedColumns: string[] = ['Minimun','Maximum', 'action'];
  dataSource: any;
  isLoaded = false;
  mode: ProgressSpinnerMode = 'indeterminate';
  isUpdating: boolean;
  counter = 0;
  newMin: string;
  newMax: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public qService: QualificatifService,public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.showQualificatifs();
  }

  changeDataSource() {

    this.dataSource = new MatTableDataSource(this.lqua);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  showQualificatifs() {
    this.qService.getQualificatifs().subscribe(res => {
      this.lqua = res;
      console.log(this.lqua);
      this.isLoaded = true
      this.changeDataSource();
      this.isUpdating = false;
    });
  }
  openDialog(msg: string,titre: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { message : msg, title : titre}
    },
    );
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
    if(!this.isUpdating){
      let index = this.paginator.pageIndex == 0 ? idx : idx + this.paginator.pageIndex * this.paginator.pageSize;
      this.newMin = this.lqua[index].minimal;
      this.newMax = this.lqua[index].maximal;
      this.qService.checkValidity(this.lqua[index].idQualificatif).subscribe(res => {
        if (!res) {
          this.updateField(idx);
          this.counter++;
        }
        else {
          this.openDialog('Ce couple qualificatif est déjà utilisé dans une question!','Opération interdite');
        }
      })
    }
  }

  cancelUpdate(idx: any) {
    let index = this.paginator.pageIndex == 0 ? idx : idx + this.paginator.pageIndex * this.paginator.pageSize;
    if (this.lqua[index].idQualificatif == null) {
      this.updateField(idx);
      this.lqua.shift();
      this.changeDataSource();
    }
    else
    {
      this.updateField(idx);
    }
  }


  updateField(idx: any) {
    this.dataSource.data[idx].updatable = !this.dataSource.data[idx].updatable;
    this.isUpdating = !this.isUpdating;
  }


  addField() {
      if(!this.isUpdating){
        this.lqua.unshift({idQualificatif:null,minimal:null,maximal:null,updatable: true });
        this.changeDataSource();
        this.newMin = "";
        this.newMax ="";
        this.paginator.firstPage();
        this.isUpdating = true;
      }
  }

  confirm() {
    console.log("confirm")
  }

  cancel() {
    console.log('cancel')
  }

  edit(idx: any) {
    let index = this.paginator.pageIndex == 0 ? idx : idx + this.paginator.pageIndex * this.paginator.pageSize;
    if (this.newMax && this.newMin) {
      this.lqua[index].maximal = this.newMax;
      this.lqua[index].minimal = this.newMin;
      console.log(this.lqua[index].maximal);

      if (this.lqua[index].idQualificatif == null) this.add(index);
      else if (this.lqua[index].idQualificatif != null) this.update(index);
    }
    else {
      this.openDialog('Veuillez renseigner tous les champs obligatoires!','Erreur');
    }
  }

  add(idx: any) {

     this.qService.addQualificatif(this.lqua[idx])
      .subscribe(() => this.showQualificatifs());

  }

  update(idx: any) {

    this.qService.updateQualificatif(this.lqua[idx])
      .subscribe(() => this.showQualificatifs());
  }

  remove(idx: any) {
    console.log(idx);

    this.qService.checkValidity(idx).subscribe(res => {
      if (!res) {
        this.qService.deleteQualificatif(idx)
          .subscribe(() => this.showQualificatifs());
      }
      else {
        this.openDialog('Ce couple qualificatif est déjà utilisé dans une question!','Action interdite');
      }
    })
  }
}

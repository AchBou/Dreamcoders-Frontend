import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormControl, NgForm } from '@angular/forms';
import { RubriqueService } from '../service/rubrique/rubrique.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AppComponent } from '../app.component';

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
  isUpdating: boolean;
  counter = 0;
  newDesignation: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public rubService: RubriqueService,public dialog: MatDialog, private app:AppComponent) { }

  public ngOnInit(): void {
    this.showRubriques();
    this.app.setTitle('Liste des rubriques standards');
  }
  
  ngOnDestroy(){
    this.app.setTitle("");
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
      this.newDesignation = this.lr[index].designation;
      this.rubService.ifLinked(this.lr[index].idRubrique).subscribe(res => {
        if (!res) {
          this.updateField(idx);
          this.counter++;
        }
        else {
          this.openDialog('Cette rubrique est déjà utilisée dans une évaluation!','Opération interdite');
        }
      })
    }
  }

  cancelUpdate(idx: any) {
    let index = this.paginator.pageIndex == 0 ? idx : idx + this.paginator.pageIndex * this.paginator.pageSize;
    if (this.lr[index].idRubrique == null) {
      this.updateField(idx);
      this.lr.shift();
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
      this.lr.unshift({ idRubrique: null, ordre: null, type: "RBS", enseignant: null, designation: null, updatable: true });
      this.changeDataSource();
      this.newDesignation = "";
      this.paginator.firstPage();
      this.isUpdating = true;
      console.log(this.counter)
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
    if (this.newDesignation) {
      console.log(this.newDesignation);
      this.lr[index].designation = this.newDesignation;
      if (this.lr[index].idRubrique == null) this.add(index);
      else if (this.lr[index].idRubrique != null) this.update(index);
    }
    else {
      this.openDialog('Veuillez renseigner tous les champs obligatoires!','Erreur');
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
        this.openDialog('Cette question est déjà utilisée dans une évaluation!','Action interdite');
      }
    })

  }
/*
  destroyModal(): boolean {
    this.modal.destroy();
    return false;
  }

  confirmRemove():boolean{
    return true;
  }

  onSubmitForm(f: NgForm){
    f.value.type = "RBS";
      console.log(f.value);
    this.rubService.addRub(f.value).subscribe(res=>{
      console.log(res);
      this.ngOnInit();
    });
    this.destroyModal();
  }
*/

}

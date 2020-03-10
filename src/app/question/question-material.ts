import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  exports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class QuestionMaterialModule {}

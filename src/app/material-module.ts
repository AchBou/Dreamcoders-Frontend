import { NgModule } from '@angular/core';
import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';



@NgModule({
  exports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MaterialModule {}

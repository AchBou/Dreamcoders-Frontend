import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, fr_FR } from 'ng-zorro-antd';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { QuestionComponent } from './question/question.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material-module';
import { ModalComponent } from './modal/modal.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DialogComponent } from './dialog/dialog.component';
import { AjouterComponent } from './evaluation/ajouter/ajouter.component';
import { RubriqueComponent } from './rubrique/rubrique.component';
import { QualificatifComponent } from './qualificatif/qualificatif.component';
import { MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlCro } from './paginator/pagintorInterface';
import { ModifierComponent } from './evaluation/modifier/modifier.component';
import { EvaluationQuestionComponent } from './evaluation/question/question.component'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EvaluationService } from './service/evaluation/evaluation.service';
registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    EvaluationComponent,
    QuestionComponent,
    HomeComponent,
    AjouterComponent,
    DialogComponent,
    RubriqueComponent,
    ModalComponent,
    QualificatifComponent,
    ModifierComponent,
    EvaluationQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzModalModule,
    NzModalModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzFormModule,
    NzSelectModule,
    MaterialModule,
    MatCheckboxModule
  ],
  entryComponents:[DialogComponent,ModalComponent],
  providers: [
    { provide: NZ_I18N, useValue: fr_FR },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
    EvaluationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

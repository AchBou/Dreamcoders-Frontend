import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, fr_FR } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';



import { EvaluationComponent } from './evaluation/evaluation.component';
import { RubriqueComponent } from './rubrique/rubrique.component';
import { QuestionComponent } from './question/question.component';
import { HomeComponent } from './home/home.component';
import { QuestionMaterialModule } from './question/question-material';
import { AjouterComponent } from './evaluation/ajouter/ajouter.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    EvaluationComponent,
    RubriqueComponent,
    QuestionComponent,
    HomeComponent,
    AjouterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    QuestionMaterialModule,
    NzDatePickerModule,
    NzFormModule,
    NzSelectModule,
    NzModalModule
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent]
})
export class AppModule { }

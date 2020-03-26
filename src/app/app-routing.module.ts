import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { QuestionComponent } from './question/question.component';
import { HomeComponent } from './home/home.component';
import { RubriqueComponent } from './rubrique/rubrique.component';
import { QualificatifComponent } from './qualificatif/qualificatif.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'rubrique', component: RubriqueComponent },
  { path: 'qualificatif', component: QualificatifComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

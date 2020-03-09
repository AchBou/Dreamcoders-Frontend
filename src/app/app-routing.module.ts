import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { AjouterComponent } from './evaluation/ajouter/ajouter.component';
import { QuestionComponent } from './question/question.component';
import { RubriqueComponent } from './rubrique/rubrique.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'evaluation/ajouter', component: AjouterComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'rubrique', component: RubriqueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

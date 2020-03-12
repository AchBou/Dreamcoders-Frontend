import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { EvaluationService } from '../service/evaluation/evaluation.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  evaluations: Evaluation[];
  isVisible : boolean = false;
 constructor(private evaluationService: EvaluationService, private app:AppComponent){}

  ngOnInit(){
    this.evaluationService.getAllEval().subscribe((evaluations) => {this.evaluations = evaluations;
    console.log(evaluations)});
    this.app.setTitle("Liste des évaluations");

  }

  ngOnDestroy(){
    this.app.setTitle("");
  }

  showModal(): void {
    this.isVisible = true;
  }

  hideModal(): void {
    this.isVisible = false;
  }

}

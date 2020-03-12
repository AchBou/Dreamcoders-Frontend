import { Component, OnInit } from '@angular/core';
import { EvaluationService } from './evaluation.service';
import { AppComponent } from '../app.component';
import { AjouterComponent } from './ajouter/ajouter.component';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  evaluations: Object[] = [];
 constructor(private evaluationService: EvaluationService, private app:AppComponent){}
  
  ngOnInit(){
    this.evaluationService.getAllEval().subscribe((evaluations) => {this.evaluations = evaluations;
    console.log(evaluations)});
    this.app.setTitle("Liste des évaluations");

  }
  isVisible : boolean = false;

  ngOnDestroy(){
    this.app.setTitle("");
  }

  showModal(): void {
    this.isVisible = true;
  }

  hideModal(): void {
    this.isVisible = false;
  }

  /*listOfData: Evaluation[] = [
    { designation: 'evaluation1',
      etat: 'active',
      debutReponse: '11/03/2020',
      finReponse: '20/04/2020',
      promotion: '2019/2020',
      formation: 'M2 DOSI',
      enseignant: 'Philippe SALIOU',
      uniteEnseignement: 'ProA',
      elementEnseignement: ''},
  { designation: 'evaluation2',
  etat: 'terminée',
  debutReponse: '20/01/2020',
  finReponse: '30/02/2020',
  promotion: '2019/2020',
  formation: 'M2 DOSI',
  enseignant: 'Philippe SALIOU',
  uniteEnseignement: 'BI',
  elementEnseignement: ''},
  { designation: 'evaluation3',
  etat: 'terminée',
  debutReponse: '02/02/2020',
  finReponse: '30/02/2020',
  promotion: '2019/2020',
  formation: 'M2 DOSI',
  enseignant: 'Philippe SALIOU',
  uniteEnseignement: 'BA',
  elementEnseignement: 'BD' },
  { designation: 'evaluation4',
  etat: 'terminée',
  debutReponse: '02/02/2020',
  finReponse: '30/02/2020',
  promotion: '2019/2020',
  formation: 'M2 DOSI',
  enseignant: 'Philippe SALIOU',
  uniteEnseignement: 'BA',
  elementEnseignement: 'DA'},
  { designation: 'evaluation5',
  etat: 'terminée',
  debutReponse: '12/12/2019',
  finReponse: '15/01/2020',
  promotion: '2019/2020',
  formation: 'M2 DOSI',
  enseignant: 'Philippe SALIOU',
  uniteEnseignement: 'SSI',
  elementEnseignement: ''},
  
  ];
*/
  

}

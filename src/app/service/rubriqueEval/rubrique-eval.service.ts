import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RubriqueEvaluation } from 'src/app/model/rubrique-evaluation';

@Injectable({
  providedIn: 'root'
})
export class RubriqueEvalService {

  baseUrl:string = environment.baseLink;

  constructor(private http: HttpClient) { }
  getRubriquesEval(id : number): Observable<any>{
    return this.http.get(this.baseUrl+"/rubriqueEval/" + id);
  }
  ajouterRubriqueEval(idEvaluation: number, idRubrique: number){
    return this.http.get(this.baseUrl+"/rubriqueEval/create/" + idEvaluation + "/" + idRubrique);
  }
  deleteRubriqueEval(idEvaluation: number,idRubrique: number){
    return this.http.delete(this.baseUrl+"/rubriqueEval/supprimer/" + idEvaluation + "/" + idRubrique);
  }
  publier(evaluation: Evaluation): Observable<any>{
    return this.http.post(this.baseUrl+"/eval/publier",evaluation);
  }
}


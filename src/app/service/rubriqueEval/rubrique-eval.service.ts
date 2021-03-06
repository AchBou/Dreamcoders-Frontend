import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RubriqueEvalService {

  baseUrl:string = environment.baseLink;

  constructor(private http: HttpClient) { }
  getRubriquesEval(id : number): Observable<any>{
    return this.http.get(this.baseUrl+"/rubriqueEval/" + id);
  }
  ajouterRubriqueEval(idEvaluation: number, idRubrique: number): Observable<any>{
    return this.http.get(this.baseUrl+"/rubriqueEval/create/" + idEvaluation + "/" + idRubrique);
  }
  deleteRubriqueEval(idRubriqueEvaluation: number){
    return this.http.delete(this.baseUrl+"/rubriqueEval/supprimer/" + idRubriqueEvaluation);
  }
  publier(evaluation: Evaluation): Observable<Evaluation>{
    return this.http.post<Evaluation>(this.baseUrl+"/eval/publier",evaluation);
  }
}


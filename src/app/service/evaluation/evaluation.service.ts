import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  evaluations: Evaluation[];

  baseUrl:string = environment.baseLink;

  constructor(private http: HttpClient) { 
    this.http.get<Evaluation[]>(this.baseUrl+"/eval/all").subscribe(val=> this.evaluations=val);
  }

  addevaluation(evaluation){
    this.evaluations.unshift(evaluation);
  }
  reloadData(){
    this.evaluations = null;
    this.http.get<Evaluation[]>(this.baseUrl+"/eval/all").subscribe(val=> this.evaluations=val);
  }
  getAllEval(): Observable<Evaluation[]>{
    return new Observable(obsever=>{
      if(this.evaluations){
        obsever.next(this.evaluations);
      }
      else{
        setTimeout(() => {
          this.getAllEval().subscribe(ev=> obsever.next(ev));
        }, 500);
      }
    })
  }
}

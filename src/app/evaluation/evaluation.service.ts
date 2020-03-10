import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  apiEvaluation:string = environment.apiEvaluation;
  
  constructor(private http: HttpClient) { }
  getAllEval(): Observable<any>{
    return this.http.get(this.apiEvaluation);
  }
}

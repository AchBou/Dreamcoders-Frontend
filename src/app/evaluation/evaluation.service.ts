import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private http: HttpClient) { }
  getAllEval(): Observable<any>{
    return this.http.get("http://localhost:8080/eval/all");
  }
}

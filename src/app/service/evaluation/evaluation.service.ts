import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  baseUrl:string = environment.baseLink;

  constructor(private http: HttpClient) { }
  getAllEval(): Observable<any>{
    return this.http.get(this.baseUrl+"/evaltion/all");
  }
}

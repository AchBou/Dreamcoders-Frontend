import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjouterService {
  server : String = "http://localhost:8080/";
  constructor(private http: HttpClient) { }
  getFormations(): Observable<any>{
    return this.http.get(this.server+"form/all");
  }
  getPromotions(Code_formation: String): Observable<any>{
    return this.http.get(this.server+"form/"+Code_formation+"/promo");
  }
  getUe(Code_formation: String): Observable<any>{
    return this.http.get(this.server+"form/"+Code_formation+"/ue");
  }
  getEc(Code_ue: String): Observable<any>{
    return this.http.get(this.server+"ue/"+Code_ue+"/ec");
  }
  addEvaluation(eva): Observable<any>{
    return this.http.post(this.server+"eval/add", eva);
  }
}


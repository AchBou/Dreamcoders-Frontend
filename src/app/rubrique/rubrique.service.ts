import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubriqueService {

  constructor(private http: HttpClient) {

   }

   getRubrique() : Observable<Rubrique []>{
     return this.http.get<Rubrique []>("http://localhost:8080/rubrique/all");
   }
}

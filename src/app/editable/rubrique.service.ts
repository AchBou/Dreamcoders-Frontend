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
   deleteRub(id:number) : Observable<boolean>{
     return this.http.delete<boolean>("http://localhost:8080/rubrique/Supprimer/"+id);
   }
   addRub(rubrique: Rubrique) : Observable<Rubrique>{
     return this.http.post<Rubrique>("http://localhost:8080/rubrique/Create", rubrique);
   }
   updateRub(rubrique: Rubrique) : Observable<boolean>{
     return this.http.post<boolean>("http://localhost:8080/rubrique/Update", rubrique);
   }
   ifLinked(id: number) : Observable<boolean> {
     return this.http.get<boolean>("http://localhost:8080/rubrique/linked/"+id);

   }
}

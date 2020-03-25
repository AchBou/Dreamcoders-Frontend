import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RubriqueService {
  baseUrl:string = environment.baseLink;
  constructor(private http: HttpClient) {

   }

   getRubrique() : Observable<Rubrique []>{
     return this.http.get<Rubrique []>(this.baseUrl+"/rubrique/all");
   }
   deleteRub(id:number) : Observable<boolean>{
     return this.http.delete<boolean>(this.baseUrl+"/rubrique/supprimer/"+id);
   }
   addRub(rubrique: Rubrique) : Observable<Rubrique>{
     return this.http.post<Rubrique>(this.baseUrl+"/rubrique/create", rubrique);
   }
   updateRub(rubrique: Rubrique) : Observable<boolean>{
     return this.http.post<boolean>(this.baseUrl+"/rubrique/update", rubrique);
   }
   ifLinked(id: number) : Observable<boolean> {
     return this.http.get<boolean>(this.baseUrl+"/rubrique/linked/"+id);

   }
}

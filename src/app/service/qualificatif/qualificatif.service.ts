import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QualificatifService {

  baseUrl:string = environment.baseLink;

  constructor(private http: HttpClient) { }

  getQualificatifs(): Observable<Qualificatif []> {
    return this.http.get<Qualificatif []>(this.baseUrl+"/qualificatif/all");
  }

  deleteQualificatif(id:number) {
    return this.http.delete(this.baseUrl+"/qualificatif/supprimer/"+id);
  }

  addQualificatif(q:Qualificatif){
    return this.http.post(this.baseUrl+"/qualificatif/create",q);
  }

  updateQualificatif(q:Qualificatif){
    return this.http.post(this.baseUrl+"/qualificatif/update",q);
  }

  checkValidity(id:number){
    return this.http.get(this.baseUrl+'/qualificatif/qualifinqst/'+id)
  }
}

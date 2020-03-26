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
    return this.http.get<Qualificatif []>(this.baseUrl+"/qualicatif/all");
  }

}

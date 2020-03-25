import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseUrl:string = environment.baseLink;

  constructor(private http: HttpClient) {
  }

  getQuestions(): Observable<Question []> {
    return this.http.get<Question []>(this.baseUrl+"/question/all");
  }

  deleteQuestion(id:number) {
    return this.http.delete(this.baseUrl+"/question/supprimer/"+id);
  }

  addQuestion(q:Question){
    return this.http.post(this.baseUrl+"/question/create",q);
  }

  updateQuestion(q:Question){
    return this.http.post(this.baseUrl+"/question/update",q);
  }

  checkValidity(id:number){
    return this.http.get(this.baseUrl+'/question/findqstinEva/'+id)
  }

}

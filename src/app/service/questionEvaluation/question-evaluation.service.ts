import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionEva } from 'src/app/model/question_evaluation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionEvaluationService {

  baseUrl:string = environment.baseLink+"/questionEvaluation";
  
  constructor(private http: HttpClient) { }

  addQuestion(questions: QuestionEva[]): Observable<any>{
    return this.http.post(this.baseUrl+"/addQuestions", questions);
  }
  deleteQuestions(questions: QuestionEva[]): Observable<any>{
    return this.http.put(this.baseUrl+"/deleteQuestions", questions);
  }
}

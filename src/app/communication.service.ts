import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor() { }
  private evaluationToEdit = new Subject<any>();



    sendEvaluation(evaluation: any) {
        this.evaluationToEdit.next(evaluation);
    }
  
    clearMessages() {
        this.evaluationToEdit.next();
    }

    getEvaluation(): Observable<any> {
        return this.evaluationToEdit;
}
}

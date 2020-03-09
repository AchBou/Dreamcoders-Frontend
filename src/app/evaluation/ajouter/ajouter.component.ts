import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {

  constructor(private app: AppComponent) { 
  }

  ngOnInit() {
    this.app.setTitle("Ajouter une Evaluation");
  }

  ngOnDestroy(){
    this.app.setTitle("")
  }
}

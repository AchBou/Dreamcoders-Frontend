import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AjouterService } from './ajouter.service';


@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {

  private formation: Formation[];
  private promotion= [{Code_Formation: "M2DOSI", Annee_Universitaire: "2019/2020"},{Code_Formation: "M2DOSI", Annee_Universitaire: "2018/2019"}];
  private ue = [{Code_Formation: "M2DOSI", Code_UE: "BS"}];
  private ec= [{Code_Formation: "M2DOSI", Code_UE: "BS", Code_EC: "BD"},{Code_Formation: "M2DOSI", Code_UE: "BS", Code_EC: "DS"}]

  constructor(private app: AppComponent, private service: AjouterService) {  }

  ngOnInit() {
    this.app.setTitle("Ajouter une Evaluation");
    this.service.getFormations().subscribe((res)=>this.formation=res);
  }

  submitForm(){
    
  }

  ngOnDestroy(){
    this.app.setTitle("")
  }
}

interface Formation{
  codeFormation: String,
  debutAccreditation: Date,
  diplome: String,
  doubleDiplome: String,
  finAccreditation: Date,
  n0Annee: number,
  nomFormation: String
}
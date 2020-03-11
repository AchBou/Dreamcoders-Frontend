import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
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

  private evaluation: Evaluation;
  private dateDebut: Date;
  constructor(private app: AppComponent, private service: AjouterService) {  }

  ngOnInit() {
    this.app.setTitle("Ajouter une Evaluation");
    this.service.getFormations().subscribe((res)=>this.formation=res);
  }

  submitForm(val: Evaluation){
      console.log(val);
  }

  ngOnDestroy(){
    this.app.setTitle("")
  }
  OnDateChange(debut: Date){
    this.dateDebut = debut;
  }
  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.dateDebut) {
      return true;
    }
    return endValue.getTime() <= this.dateDebut.getTime();
  };
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      startValue = new Date();
    }
    return startValue.getTime() <= new Date().getTime();
  };
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
interface Evaluation{
  code_formation: String,
  annee_universitaire: String,
  code_ue: String,
  code_ec: String,
  no_evaluantion: Number,
  designation: String,
  etat: String,
  periode: String,
  debut_reponse: Date,
  fin_reponse: Date
}
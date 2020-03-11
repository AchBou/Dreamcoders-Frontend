import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { AjouterService } from './ajouter.service';
import { EvaluationComponent } from '../evaluation.component';
import { NzModalService } from 'ng-zorro-antd';


@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {
  @Input()  hideModal(){};

  private formation: Formation[];
  private promotion: PromotionPK[];
  private ue = [{Code_Formation: "M2DOSI", Code_UE: "BS"}];
  private ec= [{Code_Formation: "M2DOSI", Code_UE: "BS", Code_EC: "BD"},{Code_Formation: "M2DOSI", Code_UE: "BS", Code_EC: "DS"}]

  private evaluation: Evaluation;
  private dateDebut: Date;
  constructor(private page: EvaluationComponent, private service: AjouterService, private modalService: NzModalService) {  }

  ngOnInit() {
    this.service.getFormations().subscribe((res)=>this.formation = res.entity);
  }

  submitForm(val: Evaluation){
      console.log(val);
      this.success()
      this.page.hideModal();
  }

  success(): void {
    this.modalService.success({
      nzTitle: 'Evaluation ajoutée',
      nzContent: 'L\'évaluation a bien été crée'
    });
  }

  getPromo(code_formation){
    if(code_formation==null){
      this.promotion = [];
    }
    else{
      this.service.getPromotions(code_formation).subscribe(res=> this.promotion = res.entity);
    }
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
    return startValue.getTime()+(24*60*60*1000) < new Date().getTime();
  };

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}

interface PromotionPK{
  anneeUniversitaire: String,
  codeFormation: String
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
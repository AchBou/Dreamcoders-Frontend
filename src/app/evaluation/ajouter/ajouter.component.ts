import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { AjouterService } from '../../service/evaluation/ajouter.service';
import { EvaluationComponent } from '../evaluation.component';
import { NzModalService, NzSelectComponent } from 'ng-zorro-antd';


@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {

  private formation: Formation[];
  private promotion: PromotionPK[];
  private ue: UE[];
  private ec: EC[];
  private EcHidden: boolean = true;

  @ViewChild('f', {static: true}) form : NgForm;
  @ViewChild('UE', {static: true}) ueselect : NzSelectComponent;
  @ViewChild('EC', {static: true}) ecselect : NzSelectComponent;

  private dateDebut: Date;
  constructor(private page: EvaluationComponent, private service: AjouterService, private modalService: NzModalService) {  }

  ngOnInit() {
    this.service.getFormations().subscribe((res)=>this.formation = res.entity);
  }

  submitForm(evaluation: EvaluationForm, f: NgForm){
      evaluation.etat = "ELA";
      evaluation.no_evaluantion = 1;
      this.service.addEvaluation(evaluation).subscribe(Res=>{
        if(Res.status==200){
          this.success()
          this.page.hideModal();
          f.reset();
          this.page.addNew(Res.entity);
        }
        else{
          this.error(Res.entity);
        }
      });
  }

  success(): void {
    this.modalService.success({
      nzTitle: 'Evaluation ajoutée',
      nzContent: 'L\'évaluation a bien été crée'
    });
  }
  error(message): void {
    this.modalService.error({
      nzTitle: 'Evaluation non ajoutée',
      nzContent: message
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
  getUE(code_formation){ 
    this.ueselect.writeValue(null);
    this.form.value.code_ue = null;
    if(code_formation==null){
      this.ue = [];
    }
    else{
      this.service.getUe(code_formation).subscribe(res=> this.ue = res.entity);
    }
  }
  getEC(code_ue){
    this.ecselect.writeValue(null);
    if(code_ue!=null){
      this.service.getEc(code_ue, this.form.value.code_formation).subscribe(res=>{
        if(res.status!=404){
          this.EcHidden = false;
          this.ec = res.entity;
        }
        else{
          this.EcHidden = true;
          this.ec = [];
        }
      });
    }
    else{
      this.ec = [];
      this.EcHidden = true;
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

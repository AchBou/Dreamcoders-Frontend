import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { AjouterService } from '../../service/evaluation/ajouter.service';
import { EvaluationComponent } from '../evaluation.component';
import { NzModalService } from 'ng-zorro-antd';


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

  private dateDebut: Date;
  constructor(private page: EvaluationComponent, private service: AjouterService, private modalService: NzModalService) {  }

  ngOnInit() {
    this.service.getFormations().subscribe((res)=>this.formation = res.entity);
  }

  submitForm(evaluation: EvaluationForm, f: NgForm){
      this.service.addEvaluation(evaluation).subscribe(Res=>{
        if(Res.status==200){
          this.success()
          this.page.hideModal();
          f.reset();
          this.page.ngOnInit();
        }
        else{
          this.error();
        }
      });
  }

  success(): void {
    this.modalService.success({
      nzTitle: 'Evaluation ajoutée',
      nzContent: 'L\'évaluation a bien été crée'
    });
  }
  error(): void {
    this.modalService.error({
      nzTitle: 'Evaluation non ajoutée',
      nzContent: 'erreur lors de la création de l\'evaluation \n'+
                  '(cette évaluation existe déja)'
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
    if(code_formation==null){
      this.ue = [];
    }
    else{
      this.service.getUe(code_formation).subscribe(res=> this.ue = res.entity);
    }
  }
  getEC(code_ue, f: NgForm){
    if(code_ue!=null){
      this.service.getEc(code_ue).subscribe(res=>{
        if(res.status!=404){
          this.EcHidden = false;
          this.ec = res.entity;
        }
        else{
          this.EcHidden = true;
          this.ec = [];
          f.value.code_ec = null;
        }
      });
    }
    else{
      this.ec = [];
      f.value.ec = null;
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

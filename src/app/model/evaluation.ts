interface Evaluation {
  id:number,
  designation:string,
  debut_reponse:Date,
  fin_reponse:Date,
  etat:string,
  noEvaluation: number
  periode:string,
  elementConstitutif:ElementConstitutif,
  enseignant:Enseignant,
  promotion:Promotion,
  uniteEnseignement: UniteEnseignement
}
interface EvaluationForm{
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

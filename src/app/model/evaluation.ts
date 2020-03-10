interface Evaluation {
  id:number,
  designation:string,
  debut_reponse:Date,
  fin_reponse:Date,
  etat:string,
  enseignant:Enseignant,
  periode:string,
  element_constitutif:ElementConstitutif,
  promotion:Promotion
}

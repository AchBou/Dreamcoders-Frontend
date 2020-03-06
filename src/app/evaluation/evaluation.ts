export class Evaluation {
    designation: string;
    etat: string;
    debutReponse: string;
    finReponse: string;
    promotion: string;
    formation: string;
    enseignant: string;
    uniteEnseignement: string;
    elementEnseignement: string;

    constructor (designation: string,
        etat: string,
        debutReponse: string,
        finReponse: string,
        promotion: string,
        formation: string,
        enseignant: string,
        uniteEnseignement: string,
        elementEnseignement: string )
   {
       this.designation= designation;
       this.etat = etat;
       this.debutReponse= debutReponse;
       this.finReponse=finReponse;
       this.promotion = promotion;
       this.formation = formation;
       this.enseignant = enseignant;
       this.uniteEnseignement=uniteEnseignement;
       this.elementEnseignement = elementEnseignement;

   }
}

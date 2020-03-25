interface UniteEnseignement {
codeFormation: string,
codeUe: string,
description: string,
designation: string,
nbhCm: number,
nbhTd: number,
nbhTp: number,
semestre: string,
enseignant: Enseignant,
formation: Formation
}
interface UE{
  id: {codeFormation : String, codeUe : String},
  description: String,
  designation: String,
  nbhCm: number,
  nbhTd: number,
  nbhTp: number,
  semestre: number
}

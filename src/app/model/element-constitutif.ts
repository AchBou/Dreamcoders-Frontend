interface ElementConstitutif {
  codeFormation: string,
  codeUe: string,
  codeEc:string,
  description: string,
  designation: string,
  nbhCm: number,
  nbhTd: number,
  nbhTp: number,
  enseignant: Enseignant,
}
interface EC{
  id : { codeFormation: String, codeUe: String, codeEc: String},
  description : String,
  designation: String,
  nbhCm: number,
  nbhTd: number,
  nbhTp: number
}

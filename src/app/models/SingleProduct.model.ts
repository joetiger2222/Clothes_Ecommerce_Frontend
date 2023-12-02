export interface singleProduct{
    id:number;
    name:string;
    description:string;
    quantity:number;
    price:number;
    imgsPaths:[{id:string, name:string,filePath:string,clotheItemId:number}]
  
  }
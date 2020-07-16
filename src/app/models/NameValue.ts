export class  NameValue{

  //TODO private readonly
  public name:string;
  public value:string;

  constructor(name:string, value:string){
    this.name = name;
    this.value = value;
  }

  public getValue(){
    return this.value;
  }

  public getName(){
    return this.name;
  }
}

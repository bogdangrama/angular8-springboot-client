import {ProductFieldInfo} from './productfieldinfo';
import {MoneyGramError} from './moneygramerror';

export class SendValidationWrapper {
  //productFieldInfoExtensionlist: ProductFieldInfo[];
  public errors: MoneyGramError[];
  public result: string;
}

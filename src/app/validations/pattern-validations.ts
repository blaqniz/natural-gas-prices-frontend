import {Injectable} from "@angular/core";

@Injectable()
export class PatternValidations {

  PASSWORD = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  MOBILE_NUMBER = "^[1-9][0-9]{8}$";
  MOBILE = "^[0]{0,1}[1-9]{1}[0-9]{8}$";
  EMAIL = "^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$";
  ALPHA_NUMBERIC = "^[A-Za-z0-9 _@'./#&+-]*$";
  STRING_ONLY = "^[a-zA-Z]+$";
  NUMBER_ONLY = "^([1-9][0-9]*)$";
  POSTAL_CODE = "^([0-9]{0,3}[1-9]{1,4}[0-9]{0,3})$";
  ACCOUNT_NUMBER_ONLY = "^([0-9]*)$";
  CIPC="^[(\w)A-Za-z0-9 _@'./#&+-]*$";
  ADDRESS="^[(\w)A-Za-z0-9 _@,'./#&+-]*$";
}

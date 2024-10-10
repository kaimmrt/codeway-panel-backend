import { CountryCodeEnum } from '../enums/country-code.enum';

export interface IUser {
  email: string;
  countryCode: CountryCodeEnum;
}

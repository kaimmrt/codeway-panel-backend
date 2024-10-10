import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CountryCodeEnum } from 'src/models/enums/country-code.enum';
import { IUser } from 'src/models/interfaces/user.interface';

export class UserProfileResponse implements IUser {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty({ enum: CountryCodeEnum, example: CountryCodeEnum.TR })
  @IsNotEmpty()
  @IsEnum(CountryCodeEnum)
  public countryCode: CountryCodeEnum;
}

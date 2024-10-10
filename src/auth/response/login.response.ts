import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CountryCodeEnum } from 'src/models/enums/country-code.enum';

export class LoginResponse {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public token: string;

  @ApiProperty({ enum: CountryCodeEnum, example: CountryCodeEnum.TR })
  @IsNotEmpty()
  @IsEnum(CountryCodeEnum)
  public countryCode: CountryCodeEnum;
}

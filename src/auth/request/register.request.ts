import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CountryCodeEnum } from 'src/models/enums/country-code.enum';

export class RegisterRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public password: string;

  @ApiProperty({ enum: CountryCodeEnum, example: CountryCodeEnum.TR })
  @IsNotEmpty()
  @IsEnum(CountryCodeEnum)
  public countryCode: CountryCodeEnum;
}

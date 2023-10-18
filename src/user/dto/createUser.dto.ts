import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly username: string;

  @IsNumber()
  @IsNotEmpty()
  phoneNo: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  password: string;
}

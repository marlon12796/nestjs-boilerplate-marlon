import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  MaxLength,
  Max,
  IsEmail,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(18)
  @Max(100)
  age: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @IsEmail()
  email: string;
}

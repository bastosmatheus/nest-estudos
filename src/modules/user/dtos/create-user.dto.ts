import { IsEmail, IsString, MinLength } from "class-validator";

class CreateUserDto {
  @IsString({ message: "O nome deve ser uma string" })
  name!: string;

  @IsEmail()
  @IsString({ message: "O email deve ser uma string" })
  email!: string;

  @IsString({ message: "A senha deve ser uma string" })
  @MinLength(4, { message: "Senha fraca" })
  password!: string;
}

export { CreateUserDto };

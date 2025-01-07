import { IsString, MinLength } from "class-validator";

class UpdateUserPasswordDto {
  @IsString({ message: "A senha deve ser uma string" })
  @MinLength(4, { message: "Senha fraca" })
  password!: string;
}

export { UpdateUserPasswordDto };

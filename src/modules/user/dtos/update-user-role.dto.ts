import { IsInt } from "class-validator";

class UpdateUserRoleDto {
  @IsInt({ message: "O id do funcionário deve ser um número" })
  id_employee!: number;
}

export { UpdateUserRoleDto };

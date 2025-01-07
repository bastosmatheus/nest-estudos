import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";

type UpdateUserRoleServiceRequest = {
  id: number;
  id_employee: number;
};

@Injectable()
class UpdateUserRoleService {
  constructor(private readonly userRepository: InMemoryUserRepository) {}

  public async execute({ id, id_employee }: UpdateUserRoleServiceRequest) {
    const userExists = await this.userRepository.getUserById(id);

    if (!userExists) {
      throw new BadRequestException("Usuário não encontrado");
    }

    const isAdminUser = userExists.role.toLocaleLowerCase() === "admin";

    if (!isAdminUser) {
      throw new UnauthorizedException("Usuário sem permissão");
    }

    const employeeExists = await this.userRepository.getUserById(id_employee);

    if (!employeeExists) {
      throw new BadRequestException("Funcionário não encontrado");
    }

    const user = await this.userRepository.updateRole(id_employee);

    return user;
  }
}

export { UpdateUserRoleService };

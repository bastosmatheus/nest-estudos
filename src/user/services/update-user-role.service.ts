import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";

type UpdateUserRoleServiceRequest = {
  id: number;
  id_employee: number;
};

@Injectable()
class UpdateUserRoleService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({ id, id_employee }: UpdateUserRoleServiceRequest) {
    const userExists = await this.userRepository.getUserById(id);

    if (!userExists) {
      throw new BadRequestException();
    }

    const employeeExists = await this.userRepository.getUserById(id_employee);

    if (!employeeExists) {
      throw new BadRequestException();
    }

    const user = await this.userRepository.updateRole(id, id_employee);

    return user;
  }
}

export { UpdateUserRoleService };

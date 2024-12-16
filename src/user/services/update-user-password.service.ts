import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { hash } from "bcrypt";

type UpdateUserPasswordServiceRequest = {
  id: number;
  password: string;
};

@Injectable()
class UpdateUserPasswordService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({ id, password }: UpdateUserPasswordServiceRequest) {
    const userExists = await this.userRepository.getUserById(id);

    if (!userExists) {
      throw new BadRequestException();
    }

    const hashPassword = await hash(password, 10);

    const user = await this.userRepository.updatePassword(id, hashPassword);

    return user;
  }
}

export { UpdateUserPasswordService };

import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
class GetUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute() {
    const users = await this.userRepository.getUsers();

    return users;
  }
}

export { GetUsersService };

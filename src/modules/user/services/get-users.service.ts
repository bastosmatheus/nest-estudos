import { Injectable } from "@nestjs/common";
import { UserDatabaseRepository } from "../repositories/user-database.repository";

@Injectable()
class GetUsersService {
  constructor(private readonly userRepository: UserDatabaseRepository) {}

  public async execute() {
    const users = await this.userRepository.getUsers();

    return users;
  }
}

export { GetUsersService };

import { Injectable } from "@nestjs/common";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";

@Injectable()
class GetUsersService {
  constructor(private readonly userRepository: InMemoryUserRepository) {}

  public async execute() {
    const users = await this.userRepository.getUsers();

    return users;
  }
}

export { GetUsersService };

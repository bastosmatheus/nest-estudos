import { User } from "@prisma/client";
import { UserRepository } from "./user.repository";
import { DatabaseService } from "src/database/database.service";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/schemas/user-schemas";

@Injectable()
class UserDatabaseRepository implements UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public async getUsers(): Promise<User[]> {
    const users = await this.databaseService.user.findMany();

    return users;
  }

  public async getUserById(id: number): Promise<User | null> {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  public async createUser(user: CreateUserDto): Promise<User> {
    const userCreated = await this.databaseService.user.create({
      data: user,
    });

    return userCreated;
  }

  public async updatePassword(id: number, newPassword: string): Promise<User> {
    const userUpdated = await this.databaseService.user.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
      },
    });

    return userUpdated;
  }

  public async deleteUser(id: number): Promise<User> {
    const userDeleted = await this.databaseService.user.delete({
      where: { id },
    });

    return userDeleted;
  }
}

export { UserDatabaseRepository };

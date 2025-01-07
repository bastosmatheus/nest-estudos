import { User } from "@prisma/client";
import { UserRepository } from "./user.repository";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";

@Injectable()
class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  public async getUsers(): Promise<User[]> {
    return this.users;
  }

  public async getUserById(id: number): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  public async createUser(user: CreateUserDto): Promise<User> {
    const userCreated = {
      ...user,
      id: this.users.length + 1,
      created_at: new Date(),
      updated_at: new Date(),
      role: "Atendente",
    };

    this.users.push(userCreated);

    return userCreated;
  }

  public async updatePassword(id: number, newPassword: string): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    const user = this.users[userIndex];

    user.password = newPassword;

    return user;
  }

  public async updateRole(id_employee: number): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id_employee);

    const user = this.users[userIndex];

    user.role = "Admin";

    return user;
  }

  public async deleteUser(id: number): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    const [user] = this.users.splice(userIndex, 1);

    return user;
  }
}

export { InMemoryUserRepository };

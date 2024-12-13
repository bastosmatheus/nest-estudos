import { Injectable } from "@nestjs/common";
import { User } from "./entity/user.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { hash } from "bcrypt";
import { GetUserByIdDto } from "./dtos/get-user-by-id.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { DeleteUserDto } from "./dtos/delete-user.dto";

@Injectable()
class UserService {
  private users: User[] = [];

  public async getUsers() {
    return this.users;
  }

  public async getUserById({ id }: GetUserByIdDto) {
    const user = this.users.find((user) => Number(id) === user.id);

    return user;
  }

  public async createUser({ name, email, password }: CreateUserDto) {
    const hashPassword = await hash(password, 10);

    const user = {
      id: this.users.length + 1,
      name,
      email,
      password: hashPassword,
    };

    this.users.push(user);

    return user;
  }

  public async updateUser(id: number, { name, email }: UpdateUserDto) {
    const user = this.users.find((user) => Number(id) === user.id);

    user.name = name;
    user.email = email;

    return user;
  }

  public async deleteUSer({ id }: DeleteUserDto) {
    const userIndex = this.users.findIndex((user) => Number(id) === user.id);

    const user = this.users.splice(userIndex, 1);

    return user;
  }
}

export { UserService };

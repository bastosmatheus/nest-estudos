import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();

    return users;
  }

  @Get(":id")
  async getUserById(@Param("id") id: number) {
    const users = await this.userService.getUserById({ id });

    return users;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser({ ...createUserDto });

    return user;
  }

  @Patch(":id")
  async updateUser(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(id, { ...updateUserDto });

    return user;
  }

  @Delete(":id")
  async deleteUSer(@Param("id") id: number) {
    const user = await this.userService.deleteUSer({ id });

    return user;
  }
}

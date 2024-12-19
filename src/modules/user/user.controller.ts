import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import {
  CreateUserService,
  GetUserByEmailService,
  GetUserByIdService,
  GetUsersService,
  UpdateUserPasswordService,
  UpdateUserRoleService,
} from "./services";
import { DeleteUserService } from "./services/delete-user.service";
import { UpdateUserPasswordDto } from "./dtos/update-user-password.dto";
import { UpdateUserRoleDto } from "./dtos/update-user-role.dto";

@Controller("users")
export class UserController {
  constructor(
    private readonly getUsersService: GetUsersService,
    private readonly getUserByEmailService: GetUserByEmailService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserPasswordService: UpdateUserPasswordService,
    private readonly updateUserRoleService: UpdateUserRoleService,
    private readonly deleteUserService: DeleteUserService
  ) {}

  @Get()
  async getUsers() {
    const users = await this.getUsersService.execute();

    return users;
  }

  @Get(":email")
  async getUserByEmail(@Param("email") email: string) {
    const users = await this.getUserByEmailService.execute({ email });

    return users;
  }

  @Get(":id")
  async getUserById(@Param("id") id: number) {
    const users = await this.getUserByIdService.execute({ id });

    return users;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.createUserService.execute({ ...createUserDto });

    return user;
  }

  @Patch(":id/password")
  async updateUserPassword(
    @Param("id") id: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ) {
    const user = await this.updateUserPasswordService.execute({ id, ...updateUserPasswordDto });

    return user;
  }

  @Patch(":id/role")
  async updateUserRole(@Param("id") id: number, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    const user = await this.updateUserRoleService.execute({ id, ...updateUserRoleDto });

    return user;
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number) {
    const user = await this.deleteUserService.execute({ id });

    return user;
  }
}

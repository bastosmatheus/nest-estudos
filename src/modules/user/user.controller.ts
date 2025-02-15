import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import {
  CreateUserService,
  GetUserByEmailService,
  GetUserByIdService,
  GetUsersService,
  UpdateUserPasswordService,
} from "./services";
import { DeleteUserService } from "./services/delete-user.service";
import { IsNumberParam } from "../../pipes/is-number-param.pipe";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import {
  CreateUserDto,
  createUserSchema,
  UpdateUserPasswordDto,
  updateUserPasswordSchema,
} from "src/schemas/user-schemas";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "src/modules/role/enums/role.enums";
import { RolesGuard } from "../role/role.guard";

@Controller("users")
export class UserController {
  constructor(
    private readonly getUsersService: GetUsersService,
    private readonly getUserByEmailService: GetUserByEmailService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserPasswordService: UpdateUserPasswordService,
    private readonly deleteUserService: DeleteUserService
  ) {}

  @Get()
  async getUsers() {
    const users = await this.getUsersService.execute();

    return users;
  }

  @Get(":email/email")
  async getUserByEmail(@Param("email") email: string) {
    const users = await this.getUserByEmailService.execute({ email });

    return users;
  }

  @Get(":id")
  async getUserById(@IsNumberParam("id") id: number) {
    const users = await this.getUserByIdService.execute({ id });

    return users;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.createUserService.execute({ ...createUserDto });

    return user;
  }

  @Patch(":id/password")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Atendente)
  async updateUserPassword(
    @IsNumberParam("id") id: number,
    @Body(new ZodValidationPipe(updateUserPasswordSchema))
    updateUserPasswordDto: UpdateUserPasswordDto
  ) {
    const user = await this.updateUserPasswordService.execute({
      id,
      ...updateUserPasswordDto,
    });

    return user;
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async deleteUser(@IsNumberParam("id") id: number) {
    const user = await this.deleteUserService.execute({ id });

    return user;
  }
}

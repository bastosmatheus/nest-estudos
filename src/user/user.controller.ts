import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UserController {
  constructor() {}

  @Post()
  async getUser(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.name) {
      return JSON.stringify({ error: "informe o nome" });
    }

    return JSON.stringify({ ...createUserDto });
  }
}

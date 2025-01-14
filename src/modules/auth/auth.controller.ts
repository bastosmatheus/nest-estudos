import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { SignInService } from "./services/sign-in.service";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import { SigninUserDto, signinUserSchema } from "src/schemas/auth-schemas";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly signInService: SignInService) {}

  @Post("signin")
  @UsePipes(new ZodValidationPipe(signinUserSchema))
  async signIn(@Body() signinUserDto: SigninUserDto) {
    const accessToken = await this.signInService.execute({ ...signinUserDto });

    return {
      access_token: accessToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get("alo")
  async alo() {
    return "ok";
  }
}

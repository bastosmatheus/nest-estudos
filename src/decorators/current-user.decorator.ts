import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { PayloadToken } from "src/schemas/auth-schemas";

const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as PayloadToken;
  }
);

export { CurrentUser };

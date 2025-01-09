import {
  PipeTransform,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ZodError, ZodSchema } from "zod";

class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);

      return parsedValue;
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const message = error.errors[0].message;

        throw new BadRequestException(message);
      }

      throw new InternalServerErrorException();
    }
  }
}

export { ZodValidationPipe };

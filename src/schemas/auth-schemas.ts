import { z } from "zod";

const signinUserSchema = z.object({
  email: z
    .string({
      required_error: "Informe o email do usuário",
      invalid_type_error: "O email deve ser uma string",
    })
    .email({
      message: "Informe um email válido",
    }),
  password: z
    .string({
      required_error: "Informe a senha do usuário",
      invalid_type_error: "A senha deve ser uma string",
    })
    .min(5, { message: "Senha fraca" }),
});

type SigninUserDto = z.infer<typeof signinUserSchema>;

const payloadSchema = z.object({
  sub: z.number(),
  role: z.string(),
});

type PayloadToken = z.infer<typeof payloadSchema>;

export { SigninUserDto, signinUserSchema, payloadSchema, PayloadToken };

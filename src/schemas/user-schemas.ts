import { z } from "zod";

const createUserSchema = z.object({
  name: z.string({
    invalid_type_error: "Informe o nome do usuário",
    required_error: "O nome deve ser uma string",
  }),
  email: z
    .string({
      invalid_type_error: "Informe o email do usuário",
      required_error: "O email deve ser uma string",
    })
    .email({
      message: "Informe um email válido",
    }),
  password: z
    .string({
      invalid_type_error: "Informe a senha do usuário",
      required_error: "A senha deve ser uma string",
    })
    .min(5, { message: "Senha fraca" }),
});

type CreateUserDto = z.infer<typeof createUserSchema>;

const updateUserPasswordSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Informe a senha do usuário",
      required_error: "A senha deve ser uma string",
    })
    .min(5, { message: "Senha fraca" }),
});

type UpdateUserPasswordDto = z.infer<typeof updateUserPasswordSchema>;

export {
  CreateUserDto,
  createUserSchema,
  updateUserPasswordSchema,
  UpdateUserPasswordDto,
};

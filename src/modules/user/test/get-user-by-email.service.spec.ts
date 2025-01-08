import { describe, test, beforeEach, expect } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";
import { CreateUserService, GetUserByEmailService } from "../services";

let userRepository: InMemoryUserRepository;
let createUserService: CreateUserService;
let getUserByEmailService: GetUserByEmailService;

describe("Teste unitário: GetUserByIdService", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();

    createUserService = new CreateUserService(userRepository);
    getUserByEmailService = new GetUserByEmailService(userRepository);
  });

  test("Deve ser possivel buscar um usuário", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@gmail.com",
      password: "102030",
    });

    const user = await getUserByEmailService.execute({
      email: "matheus@gmail.com",
    });

    expect(user).toBeTruthy();
  });

  test("Não deve retornar se o usuário não existe", async () => {
    expect(async () => {
      await getUserByEmailService.execute({
        email: "emailnaoexiste@gmail.com",
      });
    }).rejects.toThrowError("Usuário não encontrado");
  });
});

import request from "supertest";
import app from "../../src/index";

/* describe("POST /alunos", () => {
  let pessoa: any;

  beforeAll(() => {
    pessoa = {
      nome: "Guilhere",
      idade: 25,
      endereco: "Foz do iguacu",
    };
  });

  it("deve criar um novo usuário", async () => {
    const expectedAluno = {
        id: expect.anything(),
        ...pessoa,
      };

    const response = await request(app).post("/api/alunos").send(pessoa).expect(201);

    console.log(response.body)
    expect(response.body).toMatchObject(expectedAluno);
  });
}); */

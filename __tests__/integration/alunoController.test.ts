import request from "supertest";
import app from "../../src/index";

describe("POST /alunos", () => {
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

    const response = await request(app)
      .post("/api/alunos")
      .send(pessoa)
      .expect(201);

    expect(response.body).toMatchObject(expectedAluno);
  });

  it("deve deletar um novo usuário", async () => {
    const expectedAluno = {
      id: expect.anything(),
      ...pessoa,
    };

    const response = await request(app)
      .post("/api/alunos")
      .send(pessoa)
      .expect(201);

    expect(response.body).toMatchObject(expectedAluno);

    const idUsuario = response.body.id;

    const pessoaUpdate = {
      nome: "Guilhere",
      idade: 25,
      endereco: "Foz do iguacu",
    };

    const responseDeleted = await request(app)
      .delete("/api/alunos/" + idUsuario)
      .send(pessoaUpdate)
      .expect(200);

    expect(responseDeleted.body).toMatchObject({
      id: expect.anything(),
      ...pessoaUpdate,
    });
  });

  it("deve editar um novo usuário", async () => {
    const expectedAluno = {
      id: expect.anything(),
      ...pessoa,
    };

    const response = await request(app)
      .post("/api/alunos")
      .send(pessoa)
      .expect(201);

    expect(response.body).toMatchObject(expectedAluno);

    const idUsuario = response.body.id;

    const AlunoUpdated = {
      nome: "teste",
      idade: 100,
      endereco: "123456",
    };

    const responseUpdated = await request(app)
      .put("/api/alunos/" + idUsuario)
      .send(AlunoUpdated)
      .expect(200);

    expect(responseUpdated.body).toMatchObject({
      id: expect.anything(),
      ...AlunoUpdated,
    });
  });

  it("deve procurar um novo usuário pelo nome", async () => {
    const expectedAluno = {
      id: expect.anything(),
      ...pessoa,
    };

    const response = await request(app)
      .post("/api/alunos")
      .send(pessoa)
      .expect(201);

    expect(response.body).toMatchObject(expectedAluno);

    const idUsuario = response.body.nome;

    const responseUpdated = await request(app)
      .get("/api/alunos/search/" + idUsuario)
      .expect(200);

    const updatedAluno = responseUpdated.body.find(
      aluno => aluno.id === idUsuario
    );

    expect(updatedAluno).toMatchObject({
      id: idUsuario,
      ...pessoa,
    });
  });


   it("deve procurar um novo usuário pelo nome", async () => {
    const expectedAluno = {
      id: expect.anything(),
      ...pessoa,
    };

    const response = await request(app)
      .post("/api/alunos")
      .send(pessoa)
      .expect(201);

    expect(response.body).toMatchObject(expectedAluno);

    const idUsuario = response.body.nome;

    const responseUpdated = await request(app)
      .get("/api/alunos/search/" + idUsuario)
      .expect(200);

    const updatedAluno = responseUpdated.body.find(
      aluno => aluno.id === idUsuario
    );

    expect(updatedAluno).toMatchObject({
      id: idUsuario,
      ...pessoa,
    });
  });
});
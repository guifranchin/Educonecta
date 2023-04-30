import {
  CreateCursoContoller,
  DeleteCursoController,
  SearchCursoByNomeController,
  SearchCursoBySiglaController,
  UpdateCursoController,
} from "../../src/controllers/cursosController";
import { HttpStatusCode } from "../../src/controllers/controller_base";
import { cursosService } from "../../src/services/cursosService";

const request = {
  body: {
    nome: "Eng Software",
    sigla: "ES",
  },
};

describe("Curso controllers", () => {
  let curso: any;

  beforeAll(() => {
    curso = {
      nome: "Eng Software",
      sigla: "ES",
    };
  });

  it("Create curso controller", async () => {
    const expectedCurso = {
      id: 1,
      ...curso,
    };

    const cursoServiceCreateSpy = jest
      .spyOn(cursosService, "create")
      .mockResolvedValue(expectedCurso);

    const createCursoContoller = new CreateCursoContoller();
    const res = await createCursoContoller.handle(request);

    expect(cursoServiceCreateSpy).toHaveBeenCalledWith("Eng Software", "ES");

    expect(res.statusCode).toBe(HttpStatusCode.Created);
    expect(res.body).toBe(expectedCurso);
  });

  it("Update curso controller", async () => {
    const expectedCurso = {
      id: 1,
      ...curso,
    };

    const cursoServiceCreateSpy = jest
      .spyOn(cursosService, "update")
      .mockResolvedValue(expectedCurso);

    const updateCursoController = new UpdateCursoController();
    const res = await updateCursoController.handle({
      body: request.body,
      params: {
        id: 1,
      },
    });

    expect(cursoServiceCreateSpy).toHaveBeenCalledWith(1, "Eng Software", "ES");

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedCurso);
  });

  it("Delete curso controller", async () => {
    const expectedCurso = {
      id: 1,
      ...curso,
    };

    const cursoServiceCreateSpy = jest
      .spyOn(cursosService, "delete")
      .mockResolvedValue(expectedCurso);

    const deleteCursoController = new DeleteCursoController();
    const res = await deleteCursoController.handle({
      params: {
        id: 1,
      },
    });

    expect(cursoServiceCreateSpy).toHaveBeenCalledWith(1);

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedCurso);
  });

  it("Search curso by name controller", async () => {
    const expectedCurso = {
      id: 1,
      ...curso,
    };

    const cursoServiceCreateSpy = jest
      .spyOn(cursosService, "findByNome")
      .mockResolvedValue(expectedCurso);

    const searchCursoByNomeController = new SearchCursoByNomeController();
    const res = await searchCursoByNomeController.handle({
      params: {
        nome: "Eng Software",
      },
    });

    expect(cursoServiceCreateSpy).toHaveBeenCalledWith("Eng Software");

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedCurso);
    expect(res.body.nome).toBe("Eng Software");
  });

  it("Search curso by sigla controller", async () => {
    const expectedCurso = {
      id: 1,
      ...curso,
    };

    const cursoServiceCreateSpy = jest
      .spyOn(cursosService, "findBySigla")
      .mockResolvedValue(expectedCurso);

    const searchCursoBySiglaController = new SearchCursoBySiglaController();
    const res = await searchCursoBySiglaController.handle({
      params: {
        sigla: "ES",
      },
    });

    expect(cursoServiceCreateSpy).toHaveBeenCalledWith("ES");

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedCurso);
    expect(res.body.sigla).toBe("ES");
  });
});

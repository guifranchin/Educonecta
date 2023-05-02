import {
  CreateCursoContoller,
  DeleteCursoController,
  LinkCourseClassController,
  ListCursosController,
  SearchCursoByNomeController,
  SearchCursoBySiglaController,
  UpdateCursoController,
} from "../../src/controllers/cursosController";
import { HttpStatusCode } from "../../src/controllers/controller_base";
import { cursosService } from "../../src/services/cursosService";
import { any } from "joi";

const request = {
  body: {
    nome: "Eng Software",
    sigla: "ES",
  },
};

describe("Curso controllers", () => {
  let curso: any;

  afterEach(() => {
    jest.clearAllMocks();
  });


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

  it("Update curso controller error test", async () => {
    const cursoServiceUpdateSpy = jest
      .spyOn(cursosService, "update")
      .mockResolvedValue(null as any);

    const updateCursoController = new UpdateCursoController();
    const res = await updateCursoController.handle({
      body: request.body,
      params: {
        id: 1,
      },
    });

    expect(cursoServiceUpdateSpy).toHaveBeenCalledWith(1, "Eng Software", "ES");

    expect(res.statusCode).toBe(HttpStatusCode.NotFound);
    expect(res.body).toStrictEqual({ "message": "Curso not found" });
  });



  it("Delete curso controller error test", async () => {
    const expectedCurso = {
      id: 1,
      ...curso,
    };

    const cursoServiceDeleteSpy = jest
      .spyOn(cursosService, "delete")
      .mockResolvedValue(null as any);

    const deleteCursoController = new DeleteCursoController();
    const res = await deleteCursoController.handle({
      params: {
        id: 1,
      },
    });

    expect(cursoServiceDeleteSpy).toHaveBeenCalledWith(1);

    expect(res.statusCode).toBe(HttpStatusCode.NotFound);
    expect(res.body).toStrictEqual({ "message": "Curso not found" });
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

  it("Search curso by name controller error test", async () => {
    const expectedCurso = {
      id: 1,
      ...curso,
    };
    const cursoServiceSearchSpy = jest
      .spyOn(cursosService, "findByNome")
      .mockResolvedValue(null as any);

    const searchCursoByNomeController = new SearchCursoByNomeController();
    const res = await searchCursoByNomeController.handle({
      params: {
        nome: "Eng Software",
      },
    });

    expect(res.statusCode).toBe(HttpStatusCode.NotFound);
    expect(res.body).toStrictEqual({ "message": "Curso not found" });

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



  it("Search curso by sigla controller error test", async () => {
    const expectedCurso = {
      id: 1,
      ...curso,
    };

    const cursoServiceSearchSiglaSpy = jest
      .spyOn(cursosService, "findBySigla")
      .mockResolvedValue(null as any);

    const searchCursoBySiglaController = new SearchCursoBySiglaController();
    const res = await searchCursoBySiglaController.handle({
      params: {
        sigla: "ES",
      },
    });
    expect(res.statusCode).toBe(HttpStatusCode.NotFound);
    expect(res.body).toStrictEqual({ "message": "Curso not found" });
  });

  it("List array cursos", async () => {
    const expectedCurso = {
      id: 1,
      ...curso,
    };

    const CursosListServiceCreateSpy = jest
      .spyOn(cursosService, "list")
      .mockResolvedValue(expectedCurso);

    const listCursosController = new ListCursosController();
    const res = await listCursosController.handle({});

    expect(CursosListServiceCreateSpy).toHaveBeenCalledWith();

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedCurso);
  });

  it("Link curso to class", async () => {
    const expectedCurso = 1

    const CursosListServiceCreateSpy = jest
      .spyOn(cursosService, "linkCourseToClass")
      .mockResolvedValue(expectedCurso);


    const linkCourseClassController = new LinkCourseClassController();
    const res = await linkCourseClassController.handle({
      params: {
        turma: 1
      },
      body: {
        curso_id: 1
      }
    });

    expect(CursosListServiceCreateSpy).toHaveBeenCalledWith(1, 1);

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toStrictEqual({});
  });

  it("Link curso to class with error", async () => {
    const expectedCurso = 1

    const CursosListServiceCreateSpy = jest
      .spyOn(cursosService, "linkCourseToClass")
      .mockResolvedValue(null as any);

    const linkCourseClassController = new LinkCourseClassController();
    const res = await linkCourseClassController.handle({
      params: {
        turma: 1
      },
      body: {
        curso_id: 1
      }
    });

    expect(CursosListServiceCreateSpy).toHaveBeenCalledWith(1, 1);

    expect(res.statusCode).toBe(HttpStatusCode.NotFound);
    expect(res.body).toStrictEqual({ "message": "Curso not found or Turma not found" });
  });








});
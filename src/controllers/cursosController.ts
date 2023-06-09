import { cursosService } from "../services/cursosService";

import {
  Controller,
  HttpException,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "./controller_base";

export class CreateCursoContoller extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { nome, sigla } = httpRequest.body;
    const createdCurso = await cursosService.create(nome, sigla);
    return {
      statusCode: HttpStatusCode.Created,
      body: createdCurso,
    };
  }
}

export class ListCursosController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const cursos = await cursosService.list();

    return {
      statusCode: HttpStatusCode.Ok,
      body: cursos,
    };
  }
}

export class UpdateCursoController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const { nome, sigla } = httpRequest.body;
    const updatedCurso = await cursosService.update(parseInt(id), nome, sigla);

    if (!updatedCurso) {
      throw new HttpException(HttpStatusCode.NotFound, "Curso not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: updatedCurso,
    };
  }
}

export class DeleteCursoController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;

    const deletedCurso = await cursosService.delete(parseInt(id));

    if (!deletedCurso) {
      throw new HttpException(HttpStatusCode.NotFound, "Curso not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: deletedCurso,
    };
  }
}

export class SearchCursoBySiglaController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { sigla } = httpRequest.params;

    const curso = await cursosService.findBySigla(sigla);

    if (!curso) {
      throw new HttpException(HttpStatusCode.NotFound, "Curso not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: curso,
    };
  }
}

export class SearchCursoByNomeController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { nome } = httpRequest.params;

    const curso = await cursosService.findByNome(nome);

    if (!curso) {
      throw new HttpException(HttpStatusCode.NotFound, "Curso not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: curso,
    };
  }
}



export class LinkCourseClassController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { turma } = httpRequest.params;
    const { curso_id } = httpRequest.body

    const cursoUpdated = await cursosService.linkCourseToClass(turma, curso_id);

    if (!cursoUpdated) {
      throw new HttpException(HttpStatusCode.NotFound, "Curso not found or Turma not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: {},
    };
  }
}

export class ListTeachersByCourseAndClass extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { cursoId, turmaAno, turmaSemstre } = httpRequest.params;


    const cursoUpdated = await cursosService.listaTeacherByCursoAndTurma(cursoId, turmaAno, turmaSemstre);

    if (!cursoUpdated) {
      throw new HttpException(HttpStatusCode.NotFound, "Curso not found or Turma not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: cursoUpdated,
    };
  }
}

export class ListStudentsByCourseAndClass extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { cursoId, turmaAno, turmaSemstre } = httpRequest.params;


    const cursoUpdated = await cursosService.listStudentsByCursoAndTurma(cursoId, turmaAno, turmaSemstre);

    return {
      statusCode: HttpStatusCode.Ok,
      body: cursoUpdated,
    };
  }
}
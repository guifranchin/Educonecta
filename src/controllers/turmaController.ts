import { turmaService } from "../services/turmaService";
import {
  Controller,
  HttpException,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "./controller_base";

export class CreateTurmaContoller extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { ano, semestre } = httpRequest.body;

    const createdTurma = await turmaService.create(ano, semestre);
    return {
      statusCode: HttpStatusCode.Created,
      body: createdTurma,
    };
  }
}

export class ListTurmasController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const turmas = await turmaService.list();

    return {
      statusCode: HttpStatusCode.Ok,
      body: turmas,
    };
  }
}

export class UpdateTurmaController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const { ano, semestre, cursoId, professorId } = httpRequest.body;

    const updatedTurma = await turmaService.update(
      Number(id),
      ano,
      semestre,
      cursoId,
      professorId
    );

    if (!updatedTurma) {
      throw new HttpException(HttpStatusCode.NotFound, "Turma not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: updatedTurma,
    };
  }
}

export class DeleteTurmaController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;

    const deletedTurma = await turmaService.delete(Number(id));

    if (!deletedTurma) {
      throw new HttpException(HttpStatusCode.NotFound, "Professor not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: deletedTurma,
    };
  }
}

export class SearchTurmaByAnoController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { ano } = httpRequest.params;
    const turmas = await turmaService.findByYear(
      ano
    );

    return {
      statusCode: HttpStatusCode.Ok,
      body: turmas,
    };
  }
}

export class SearchTurmaBySemestreController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { semestre } = httpRequest.params;
    const turmas = await turmaService.findBySemester(
      semestre
    );

    return {
      statusCode: HttpStatusCode.Ok,
      body: turmas,
    };
  }
}

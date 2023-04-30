import {professorService} from "../services/professorService";
import {
  Controller,
  HttpException,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "./controller_base";

export class CreateProfessorContoller extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { nome, endereco, especialidade } = httpRequest.body;

    const createdProfessor = await professorService.create(
      nome,
      endereco,
      especialidade
    );
    return {
      statusCode: HttpStatusCode.Created,
      body: createdProfessor,
    };
  }
}

export class ListProfessoresController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const professores = await professorService.list();

    return {
      statusCode: HttpStatusCode.Ok,
      body: professores,
    };
  }
}

export class FindProfessorByIdController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const professor = await professorService.findById(id);

    if (!professor) {
      throw new HttpException(HttpStatusCode.NotFound, "Professor not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: professor,
    };
  }
}

export class UpdateProfessorController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const { nome, email, especialidade } = httpRequest.body;

    const updatedProfessor = await professorService.update(
      Number(id),
      nome,
      email,
      especialidade
    );

    if (!updatedProfessor) {
      throw new HttpException(HttpStatusCode.NotFound, "Professor not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: updatedProfessor,
    };
  }
}

export class DeleteProfessorController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;

    const deletedProfessor = await professorService.delete(Number(id));

    if (!deletedProfessor) {
      throw new HttpException(HttpStatusCode.NotFound, "Professor not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: deletedProfessor,
    };
  }
}

export class SearchProfessorByEspecialidadeController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { especialidade } = httpRequest.params;
    const professores = await professorService.findByEspecialidade(
      especialidade
    );

    return {
      statusCode: HttpStatusCode.Ok,
      body: professores,
    };
  }
}

export class SearchProfessorByNomeController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { nome } = httpRequest.params;

    const professor = await professorService.findByNome(nome);

    if (!professor) {
      throw new HttpException(HttpStatusCode.NotFound, "Professor not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: professor,
    };
  }
}

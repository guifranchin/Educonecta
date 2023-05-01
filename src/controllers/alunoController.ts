import { userService } from "../services/alunoService";
import {
  Controller,
  HttpException,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from "./controller_base";

export class CreateAlunoContoller extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { nome, idade, endereco } = httpRequest.body;

    const createdUser = await userService.create(nome, idade, endereco);

    return {
      statusCode: HttpStatusCode.Created,
      body: createdUser,
    };
  }
}

export class ListAlunoController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const users = await userService.list();

    return {
      statusCode: HttpStatusCode.Ok,
      body: users,
    };
  }
}

export class ShowAlunoController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;

    const user = await userService.show(id);

    if (!user) {
      throw new HttpException(HttpStatusCode.NotFound, "User not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: user,
    };
  }
}

export class UpdateAlunoController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const { nome, idade, endereco } = httpRequest.body;

    const updatedUser = await userService.update(id, nome, idade, endereco);

    if (!updatedUser) {
      throw new HttpException(HttpStatusCode.NotFound, "User not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: updatedUser,
    };
  }
}

export class DeleteAlunoController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;

    const deletedUser = await userService.remove(id);

    if (!deletedUser) {
      throw new HttpException(HttpStatusCode.NotFound, "User not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: deletedUser,
    };
  }
}

export class SearchAlunoByNameController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { nome } = httpRequest.params;

    const users = await userService.searchByName(nome);

    return {
      statusCode: HttpStatusCode.Ok,
      body: users,
    };
  }
}

export class LinkStudentClassController extends Controller {
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { turma } = httpRequest.params;
    const { aluno_id } = httpRequest.body

    const AlunoUpdated = await userService.linkStudentToClass(turma, aluno_id);

    if (!AlunoUpdated) {
      throw new HttpException(HttpStatusCode.NotFound, "Aluno not found or Turma not found");
    }

    return {
      statusCode: HttpStatusCode.Ok,
      body: {},
    };

  }
}

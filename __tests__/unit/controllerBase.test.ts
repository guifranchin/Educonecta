
  import { HttpException, HttpStatusCode, Controller, HttpRequest, HttpResponse } from "../../src/controllers/controller_base";

describe("Controller Base", () => {
    const turma = {
      ano: "2023",
      semestre: "1",
      cursoId: 1,
      professorId: 1,
    };
  
    it('deve retornar o erro generico', async () => {
      const request = {
        body: {
          nome: 'teste',
       
        }
      };
  
      class TestController extends Controller {
        async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
          throw new Error('Something went wrong');
        }
      }
  
      const testController = new TestController();
      const expectedResponse: HttpResponse = {
        statusCode: HttpStatusCode.InternalServerError,
        body: {
          message: 'Something went wrong'
        }
      };
  
      const response = await testController.handle(request);
      expect(response).toEqual(expectedResponse);
    });
  });
export interface HttpRequest{
    params?: any
    body?: any
    query?: any
    headers?: any
}

export interface HttpResponse{
    statusCode: number
    body: any
}

export enum HttpStatusCode{
    Ok = 200,
    Created = 201,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500
}

export class HttpException extends Error{
    public statusCode : HttpStatusCode

    constructor(statusCode: number, message: string){
        super(message)
        this.statusCode = statusCode
    }
}

export abstract class Controller{
    async handle(httpRequest: HttpRequest): Promise<HttpResponse>{
        try {
            return await this.perform(httpRequest)
        } catch (error) {
            if(error instanceof HttpException){
                return {
                    statusCode: error.statusCode,
                    body: {message: error.message}
                }
            }

            return {
                statusCode: HttpStatusCode.InternalServerError,
                body: {message: "Something went wrong"}
            }
        }
    }

    abstract perform(httpRequest: HttpRequest): Promise<HttpResponse>
}
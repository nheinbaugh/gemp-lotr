/**
 * Callback that returns an HTTP status code
 */
export type onHttpError = (error: HttpError) => void;

export type onHttpSuccess = (result: Partial<HttpSuccess>) => void;

export type HttpSuccess = {
    data: unknown;
}

export type HttpError = {
    statusCode: string;
}
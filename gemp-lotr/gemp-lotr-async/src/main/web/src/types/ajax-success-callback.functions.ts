import { HttpSuccess } from "./callback.types";

export const convertAjaxResultToSuccess = (input: any): Partial<HttpSuccess> {
    return {
        data: input
    }
}
import { HttpError } from "./callback.types";

export const convertjQueryErrorToHttpError = ({status}: {status: number}): HttpError => {
    // presumably other stuff has data it passes back. Who knows.
    return {
        statusCode: status.toString()
    }
}
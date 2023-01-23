import { HttpError } from "../../types/callback.types"

export const handleRegistrationError = ({statusCode}: HttpError): void => {
    switch (statusCode) {
        case "0":
            alert("Unable to connect to server, either server is down or there is a problem with your internet connection");
            break;
        case "400":
            $(".error").html("Login is invalid. Login must be between 2-10 characters long, and contain only<br/> english letters, numbers or _ (underscore) and - (dash) characters.");
            break;
        case "409":
            $(".error").html("User with this login already exists in the system. Try a different one.");
            break;
        case "503":
            $(".error").html("Server is down for maintenance. Please come at a later time.");
            break;
        default:
            console.error(`[login] - unknown login error ${statusCode}`)
            break;
        }
}

export const handleRegistrationSuccess = (): void => {
    location.href = "/gemp-lotr/hall.html";
}
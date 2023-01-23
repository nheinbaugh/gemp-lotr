import { HttpError } from "../../types/callback.types";

export const onLoginError = ({statusCode}: HttpError) => {
    switch (statusCode) {
        case "0":
            alert("Unable to connect to server, either server is down or there is a problem" +
                " with your internet connection");
            break;
        case "401":
            $(".error").html("Invalid username or password. Try again.");
            // loginScreen();
            break;
        case "403":
            $(".error").html("You have been permanently banned. If you think it was a mistake you can try sending a private message to Merrick_H on <a href='http://lotrtcgwiki.com/forums/'>TLHH forums</a>.");
            $(".interaction").html("");
            break;
        case "409":
            $(".error").html("You have been temporarily banned. You can try logging in at a later time. If you think it was a mistake you can try sending a private message to Merrick_H on <a href='http://lotrtcgwiki.com/forums/'>TLHH forums</a>.");
            $(".interaction").html("");
            break;
        case "503":
            $(".error").html("Server is down for maintenance. Please come at a later time.");
            break;
        default:
            console.error(`[login] - unknown login error ${statusCode}`)
            break;
        }
}

export const onLoginSuccess = (): void => {
    location.href = "/gemp-lotr/hall.html";
}
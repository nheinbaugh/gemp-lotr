import { LogInService } from "./services/login.service";
import { RegistrationInfo } from "./types/registration.interface";
import { isValidRegistration } from "./types/validate-registration.functions";

const loginService = new LogInService("/gemp-lotr-server");

function register() {
    const info = getRegistrationValues();
    const isValid = isValidRegistration(info);
    if (!isValid) {
        $(".error").html("Password and Password repeated are different! Try again");
        return;
    }
    loginService.register(info, () => {
        location.href = "/gemp-lotr/hall.html";
    });
}

const getRegistrationValues = (): RegistrationInfo => {
    const userName = $("#login").val().toString();
    const password = $("#password").val().toString();
    const confirmationPassword = $("#password2").val().toString();

    return {
        userName,
        password,
        confirmationPassword
    }
}

function registrationScreen() {
    loginService.getRegistrationForm((html: string) => {
        $(".error").html();
        $(".interaction").html(html);
        ($("#registerButton") as any).button().click(register);
    });
}

function login() {
    const login = $("#login").val().toString();
    const password = $("#password").val().toString();

    loginService.login(login, password, () => {
        location.href = "/gemp-lotr/hall.html";
    });
}

function loginScreen() {
    $(".interaction").html("");
    $(".interaction").append("Login below, or ");
    var registerButton = ($("<div>Register</div>") as any).button();
    registerButton.click(registrationScreen);

    $(".interaction").append(registerButton);
    $(".interaction").append("<br/>Login: <input id='login' type='text'><br/>Password: <input id='password' type='password'><br/>");

    var loginButton = ($("<div>Login</div>") as any).button();
    loginButton.click(login);

    $("#password").keypress((e) => {
        if (e.code === '13') {
            login();
            e.preventDefault();
            return false;
        }
    });

    $(".interaction").append(loginButton);
}

$(document).ready(() => {
    loginScreen();
});
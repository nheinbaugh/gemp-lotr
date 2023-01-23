import { RegistrationInfo } from "../types/registration.interface";

export class LogInService {
    constructor(private readonly url: string) {
    }

    login (login: string, password: string, callback: () => void): void {
        $.ajax({
            type:"POST",
            url:this.url + "/login",
            cache:false,
            async:false,
            data:{
                login:login,
                password:password,
            },  
            success: callback,
            dataType:"html"
        });
    }

    register(info: RegistrationInfo, callback: () => void): void {
        $.ajax({
            type:"POST",
            url:this.url + "/register",
            cache:false,
            data:{
                login: info.userName,
                password: info.password,
            },
            success: callback,
            error: ((xhr: {status: string | number}) => {
                const status = xhr.status.toString();
                if (status === "0") {
                    alert("Unable to connect to server, either server is down or there is a problem" +
                    " with your internet connection");
                } else if (status === "400") {
                    $(".error").html("Login is invalid. Login must be between 2-10 characters long, and contain only<br/>" +
                    " english letters, numbers or _ (underscore) and - (dash) characters.");
                } else if (status === "409") {
                    $(".error").html("User with this login already exists in the system. Try a different one.");

                } else if (status === "503") {
                    $(".error").html("Server is down for maintenance. Please come at a later time.");
                }
            }),
            dataType:"html"
        })
    }

    getRegistrationForm (callback: (content: string) => void): void {
        $.ajax({
            type:"POST",
            url:"/gemp-lotr/includes/registrationForm.html",
            cache:false,
            async:false,
            success: callback,
            dataType:"html"
        });
    }
}
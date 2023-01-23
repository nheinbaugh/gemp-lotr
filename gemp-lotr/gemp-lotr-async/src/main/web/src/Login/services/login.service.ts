import { convertAjaxResultToSuccess } from "../../types/ajax-success-callback.functions";
import { onHttpError, onHttpSuccess } from "../../types/callback.types";
import { convertjQueryErrorToHttpError } from "../../types/http-error-callback.functions";
import { RegistrationInfo } from "../types/registration.interface";

export class LogInService {
    constructor(private readonly url: string) {
    }

    login (login: string, password: string, successCallback: onHttpSuccess, errorCallback: onHttpError): void {
        $.ajax({
            type:"POST",
            url:this.url + "/login",
            cache:false,
            async:false,
            data:{
                login:login,
                password:password,
            },  
            success: (res) => successCallback(convertAjaxResultToSuccess(res)),
            error: (res) => errorCallback(convertjQueryErrorToHttpError(res)),
            dataType:"html"
        });
    }

    register(info: RegistrationInfo, successCallback: onHttpSuccess, errorCallback: onHttpError): void {
        $.ajax({
            type:"POST",
            url:this.url + "/register",
            cache:false,
            data:{
                login: info.userName,
                password: info.password,
            },
            success: (res) => successCallback(convertAjaxResultToSuccess(res)),
            error: (res) => errorCallback(convertjQueryErrorToHttpError(res)),
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

import { RegistrationInfo } from "./registration.interface";

export const isValidRegistration = (info: RegistrationInfo): boolean => {
    return info.userName &&  info.password === info.confirmationPassword;
}
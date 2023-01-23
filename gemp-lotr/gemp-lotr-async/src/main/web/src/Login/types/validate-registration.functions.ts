import { RegistrationInfo } from "./registration.interface";

export const isValidRegistration = (info: RegistrationInfo): boolean => {
    return info.password === info.confirmationPassword;
}
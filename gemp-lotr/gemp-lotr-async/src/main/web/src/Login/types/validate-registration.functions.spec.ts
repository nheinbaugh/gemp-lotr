import { RegistrationInfo } from "./registration.interface";
import { isValidRegistration } from "./validate-registration.functions";

describe('login page', () => {
    describe('isValidRegistration', () => {
        it('should fail when no username is provided', () => {
            const info: RegistrationInfo = {
                userName: undefined,
                password: '123',
                confirmationPassword: '123'
            } as RegistrationInfo;
            expect(isValidRegistration(info)).toBeFalsy();
        });

        it('should fail when no password is provided', () => {
            const info = {
                userName: 't-swizzle',
                password: undefined,
                confirmationPassword: '123'
            } as RegistrationInfo;
            expect(isValidRegistration(info)).toBeFalsy();
        })

        it('should fail when no confirmation of the password is provided', () => {
            const info = {
                userName: 't-swizzle',
                password: '123',
                confirmationPassword: undefined
            } as RegistrationInfo;
            expect(isValidRegistration(info)).toBeFalsy();
        })

        it('should succeed when all fields are provided and the password and confirmation match', () => {
            const info: RegistrationInfo = {
                userName: 't-swizzle',
                password: '123',
                confirmationPassword: '123'
            };
            expect(isValidRegistration(info)).toBeTruthy();
        })

        it('should fail when given non matching passwords', () => {
            const info = {
                userName: 't-swizzle',
                password: '345',
                confirmationPassword: '123'
            } as RegistrationInfo;
            expect(isValidRegistration(info)).toBeFalsy();
        })
    })
})
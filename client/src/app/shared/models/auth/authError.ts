export class AuthError {
    isError: boolean;
    message: string;

    constructor(isError, message) {
        this.isError = isError;
        this.message = message;
    }
}

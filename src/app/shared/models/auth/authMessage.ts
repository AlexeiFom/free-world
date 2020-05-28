export class AuthMessage {
    isError: boolean;
    text: string;
    class: {
        background: string;
        border: string;
    }

    constructor(isError, message) {
        this.isError = isError;
        this.text = message;
    }
}

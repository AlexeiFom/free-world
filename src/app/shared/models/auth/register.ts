//toDo Add interface

export class Register {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
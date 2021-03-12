class UserAlreadyExistsException extends Error {
    constructor(message){
        super(message || "User already exists");
        this.status = 406;
    }
}

module.exports = UserAlreadyExistsException;
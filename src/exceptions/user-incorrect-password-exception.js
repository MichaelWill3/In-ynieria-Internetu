class UserIncorrectPasswordException extends Error {
    constructor(message){
        super(message || "Incorrect password");
        this.status = 404;
    }
}

module.exports = UserIncorrectPasswordException;
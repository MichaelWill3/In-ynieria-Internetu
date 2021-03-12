class BookAlreadyInCollectionException extends Error {
    constructor(message){
        super(message || "Book already in collection");
        this.status = 402;
    }
}

module.exports = BookAlreadyInCollectionException;
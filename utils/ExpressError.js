module.exports=class ExpressError{
    constructor(message,status){
        this.message=message;
        this.status=status;
    }
}
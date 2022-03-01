import HttpStatus from "http-status-codes";
import BaseError from "./base";

class ConflictError extends BaseError {
  constructor(message = "Resource already exists", status = HttpStatus.CONFLICT, data: any) {
    super(message, status, data);
    this.name = "ConflictError";
  }
}

export default ConflictError;
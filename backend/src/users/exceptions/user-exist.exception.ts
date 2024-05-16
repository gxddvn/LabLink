import { HttpStatus, HttpException } from '@nestjs/common';

export class UserExistsException extends HttpException {
    constructor() {
        super('User already exists', HttpStatus.BAD_REQUEST);
    }
}
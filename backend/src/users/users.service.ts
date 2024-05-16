import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { AuthPayloadDto, UpdateDto } from './dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { UserExistsException } from './exceptions/user-exist.exception';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}
    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
    findOne(id: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }
    async registration(user: User): Promise<string | User> {
        const {email, phone} = user;
        const findUser = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.email = :email OR user.phone = :phone', { email, phone })
            .getOne();
        if (!findUser) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
            const {password, ...saveUser} = await this.usersRepository.save(user);
            return this.jwtService.sign(saveUser);
        } else throw new UserExistsException();
    }
    async login({email, password}: AuthPayloadDto): Promise<string | User> {
        const findUser = await this.usersRepository.findOneBy({ email })
        if (!findUser) return null;
        const isMatch = await bcrypt.compare(password, findUser?.password);
        if (isMatch) {
            const {password, ...user} = findUser;
            return this.jwtService.sign(user)
        }
        return findUser;
    }

    async checkAuth(user: any) {
        const {iat, exp, ...userA} = user;
        return this.jwtService.sign(userA)
    }

    async updateUser(user: User): Promise<string | User> {
        const {password, ...saveUser} = await this.usersRepository.save(user)
        return this.jwtService.sign(saveUser);
    }
    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
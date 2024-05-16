import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './users.service';
import { User } from './entities/users.entity';
import { AuthPayloadDto, UpdateDto } from './dto/users.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Post()
    registration(@Body() user: User): Promise<string | User> {
        return this.userService.registration(user);
    }

    @Post('login')
    login(@Body() user: AuthPayloadDto): Promise<string | User> {
        return this.userService.login(user);
    }

    @Post('auth')
    @UseGuards(JwtAuthGuard)
    checkAuth(@Req() req: Request) {
        return this.userService.checkAuth(req.user);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() user: User): Promise<string | User> {
        return this.userService.updateUser(user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id);
    }
}

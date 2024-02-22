import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/@core/auth/dtos/CreateUserDto';
import { LoginDto } from 'src/@core/auth/dtos/LoginDto';
import { UserService } from 'src/@core/auth/services/User.service';

@Controller('auth')
export class AuthController {
  @Inject(UserService)
  private readonly userService: UserService;
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const res = await this.userService.login(loginDto);

    return res.getValue();
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const res = await this.userService.register(createUserDto);
    return res.getValue();
  }

  @Get()
  async get() {
    const a = new LoginDto('email', 'asd');
    return await this.userService.login(a);
  }
}

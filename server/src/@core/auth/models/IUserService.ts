import { Result } from 'src/@core/error/Result';
import { AuthResponseDto } from '../dtos/AuthResponseDto';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { LoginDto } from '../dtos/LoginDto';

export interface IUserService {
  login(loginDto: LoginDto): Promise<Result<AuthResponseDto> | null>;
  register(
    createUserDto: CreateUserDto,
  ): Promise<Result<AuthResponseDto> | null>;
}

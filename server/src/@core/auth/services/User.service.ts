import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { LoginDto } from '../dtos/LoginDto';
import { IUserService } from '../models/IUserService';
import { User } from '../models/User';
import { UserRepository } from '../models/UserRepository';
import { ITokenService } from '../util/token/ITokenService';
import { IPasswordService } from '../util/password/IPasswordService';
import { Result } from 'src/@core/error/Result';
import { AuthResponseDto } from '../dtos/AuthResponseDto';

export class UserService implements IUserService {
  private readonly passwordService: IPasswordService;
  private readonly tokenService: ITokenService;
  private readonly userRepo: UserRepository;

  constructor(
    userRepo: UserRepository,
    passwordService: IPasswordService,
    tokenService: ITokenService,
  ) {
    this.userRepo = userRepo;
    this.passwordService = passwordService;
    this.tokenService = tokenService;
  }

  async login(loginDto: LoginDto): Promise<Result<AuthResponseDto>> {
    const user = await this.userRepo.getUser(loginDto.email);
    if (user) {
      const token = this.tokenService.genToken(
        user.id,
        user.email,
        'user.created_at',
      );
      return Result.ok<AuthResponseDto>({ token });
    }

    return null;
  }
  async register(
    createUserDto: CreateUserDto,
  ): Promise<Result<AuthResponseDto>> {
    const hash = await this.passwordService.generateHash(
      createUserDto.password,
    );

    const user = new User(randomUUID(), new Date(), createUserDto.email, hash);

    const userCreated = await this.userRepo.createUser(user);

    if (userCreated) {
      const token = this.tokenService.genToken(
        user.id,
        user.email,
        'user.created_at',
      );
      return Result.ok<AuthResponseDto>({ token });
    }
    return null;
  }
}

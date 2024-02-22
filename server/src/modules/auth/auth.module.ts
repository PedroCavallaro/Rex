import { Module } from '@nestjs/common';
import { PostgresUserRepo } from 'src/@core/auth/repos/PostgresUserRepo';
import { UserService } from 'src/@core/auth/services/User.service';
import { AuthController } from './auth.controller';
import { DbService } from 'src/@core/db/DbService';
import { TokenService } from 'src/@core/auth/util/token/TokenService';
import { PasswordService } from 'src/@core/auth/util/password/PasswordService';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    DbService,
    {
      provide: PasswordService,
      useFactory: () => {
        return new PasswordService();
      },
    },
    {
      provide: TokenService,
      useFactory: () => {
        return new TokenService();
      },
    },
    {
      provide: PostgresUserRepo,
      useFactory: () => {
        return new PostgresUserRepo();
      },
      inject: [DbService],
    },
    {
      provide: UserService,
      useFactory: (
        userRepo: PostgresUserRepo,
        passwordService: PasswordService,
        tokenSevice: TokenService,
      ) => {
        return new UserService(userRepo, passwordService, tokenSevice);
      },
      inject: [PostgresUserRepo, PasswordService, TokenService],
    },
  ],
})
export class AuthModule {}

import { Controller, Get, Post, Body } from '@nestjs/common';

import { GetUser } from './decorators';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Auth(ValidRoles.admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  // @Get('private')
  // @UseGuards(AuthGuard())
  // testingPrivateRoute(
  //   @GetUser() user: User,
  //   @GetUser('email') userEmail: Partial<User>,
  //   @RawHeaders() headers: string[],
  // ) {
  //   return {
  //     ok: true,
  //     msg: 'This is a private route, only logged in users can see this.',
  //     user,
  //     userEmail,
  //     headers,
  //   };
  // }

  // @Get('private2')
  // @RoleProtected(ValidRoles.superUser)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // privateRoute(@GetUser() user: User) {
  //   return {
  //     ok: true,
  //     user,
  //   };
  // }

  @Get('private3')
  @Auth(ValidRoles.superUser)
  privateRoute(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
  @Get('public')
  publicRoute() {
    return {
      ok: true,
      msg: 'This is a public route, everyone can see this.',
    };
  }
}

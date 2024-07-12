import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

// ExecutionContext is an interface that provides metadata about the current request context.
export const GetUser = createParamDecorator((data, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const user = req.user;

  if (!user) throw new InternalServerErrorException('User not found in request context.');

  return !data ? user : user[data];
});

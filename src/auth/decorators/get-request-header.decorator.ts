import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

// ExecutionContext is an interface that provides metadata about the current request context.
export const RawHeaders = createParamDecorator((data, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const headers = req.headers;

  if (!headers) throw new InternalServerErrorException('Headers not found in request context.');

  return !data ? headers : headers[data];
});

import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator((_data, context): User => {
  const req = context.switchToHttp().getRequest();
  return req.user;
});

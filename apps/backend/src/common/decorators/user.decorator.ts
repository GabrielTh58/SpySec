import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserLogged = createParamDecorator((_, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    return req.user
})
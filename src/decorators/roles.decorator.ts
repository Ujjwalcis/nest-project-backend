// import { ExecutionContext, createParamDecorator } from "@nestjs/common";
// import { Role } from "src/entity/role.enum";

// export const Roles = createParamDecorator((data: any, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();

//     const role = request.role;
//     console.log("Role = ", role);

//     return role;
// })

import { Reflector } from "@nestjs/core";
import { Role } from "src/entity/role.enum";

export const Roles = Reflector.createDecorator<Role[]>();

/*
import { SetMetadata } from "@nestjs/common";
import { Role } from "src/entity/role.enum";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
*/
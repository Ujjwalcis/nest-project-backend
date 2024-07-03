import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response, NextFunction } from 'express';
import { lastValueFrom } from 'rxjs';
import { Roles } from 'src/decorators/roles.decorator';
import { UserVerifyDto } from 'src/dto/userVerify.dto';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(@Inject('AUTHENTICATION') private readonly authenticationClient: ClientProxy, private reflector: Reflector) { }

    extractToken(tokenFromHeader: string): any {
        const splitToken = tokenFromHeader.split(' ');
        if (splitToken[0] === 'Bearer') {
            return splitToken[1];
        }

        return ' ';
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = this.extractToken(req.headers.authorization);

        // const role = this.reflector.getAllAndOverride(Roles, [req.route, req.]);

        // console.log(role)

        const userVerifyDto: UserVerifyDto = {
            token: token,
            key: process.env.JWT_KEY,
        };

        try {
            const result = await lastValueFrom(this.authenticationClient.send('authenticate', userVerifyDto))
            next();
        } catch (error) {
            return res.status(401).send({
                message: 'Unauthorized',
                error: new UnauthorizedException(),
            });
        }
    }
}

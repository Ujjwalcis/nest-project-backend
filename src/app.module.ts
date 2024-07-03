import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [ClientsModule.register([
    {
      name: "USERCRUD",
      transport: Transport.TCP,
      options: {
        port: 3001
      }
    },
    {
      name: "AUTHENTICATION",
      transport: Transport.TCP,
      options: {
        port: 3002
      }
    },
  ]),
  ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, Reflector],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude({ path: "user/login", method: RequestMethod.POST })
      .forRoutes(AppController)
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/auth'),
    UserModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}

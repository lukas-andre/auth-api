import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/auth', {useNewUrlParser: true, useUnifiedTopology: true }),
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
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

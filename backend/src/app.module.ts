import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [CatsController, AuthController],
  providers: [AppService],
})
export class AppModule {}

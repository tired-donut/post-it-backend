import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalGuard } from './guards/local.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtGuard } from './guards/jwt.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: './envs/.env',
		}),
		JwtModule.register({
			secret: process.env.TOKEN_SECRET,
		}),
		UsersModule,
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, LocalGuard, JwtStrategy, JwtGuard],
})
export class AuthModule {}

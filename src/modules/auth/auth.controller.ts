import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { LocalGuard } from './guards/local.guard';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
	constructor(private readonly _authService: AuthService) {}

	@Post('sign-up')
	async singUp(
		@Body(new ValidationPipe()) signUpDto: SignUpDto,
	): Promise<Pick<User, 'id' | 'name' | 'username'>> {
		const signUp = await this._authService.signUp({
			name: signUpDto.name,
			username: signUpDto.username,
			email: signUpDto.email,
			password: signUpDto.password,
		});

		return {
			id: signUp.id,
			name: signUp.name,
			username: signUp.username,
		};
	}

	@UseGuards(LocalGuard)
	@Post('sign-in')
	async signIn(
		@Request() req: any,
	): Promise<{ accessToken: string; type: 'Bearer' }> {
		const signIn = await this._authService.signIn({
			username: req.user.username,
		});

		return {
			accessToken: signIn.accessToken,
			type: 'Bearer',
		};
	}
}

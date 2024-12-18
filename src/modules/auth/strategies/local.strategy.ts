import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/modules/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly _authService: AuthService) {
		super();
	}

	async validate(
		username: User['username'],
		password: User['password'],
	): Promise<Pick<User, 'id' | 'username'>> {
		const user = await this._authService.validate({
			username: username,
			password: password,
		});

		if (!user) throw new UnauthorizedException('Bad credentials');

		return {
			id: user.id,
			username: user.username,
		};
	}
}

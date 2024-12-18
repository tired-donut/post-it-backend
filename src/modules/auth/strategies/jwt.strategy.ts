import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	public constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.TOKEN_SECRET,
		});
	}

	public validate(
		payload: Pick<User, 'id' | 'username'>,
	): Pick<User, 'id' | 'username'> {
		return {
			id: payload.id,
			username: payload.username,
		};
	}
}

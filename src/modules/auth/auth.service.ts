import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HashUtil } from 'src/utils/hash.util';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
	public constructor(
		private readonly _userService: UsersService,
		private readonly _jwtService: JwtService,
	) {}

	public async signUp(
		data: Pick<User, 'name' | 'username' | 'email' | 'password'>,
	): Promise<Pick<User, 'id' | 'name' | 'username'>> {
		const user = await this._userService.create({
			name: data.name,
			username: data.username,
			email: data.email,
			password: await HashUtil.hash(data.password),
		});

		return {
			id: user.id,
			name: user.name,
			username: user.username,
		};
	}

	public async validate(
		data: Pick<User, 'username' | 'password'>,
	): Promise<Pick<User, 'id' | 'username'>> {
		try {
			const user = await this._userService.findByUsername({
				username: data.username,
			});

			if (
				!user ||
				!(await HashUtil.compare(data.password, user.password))
			)
				return null;

			return {
				id: user.id,
				username: user.username,
			};
		} catch (e) {
			return null;
		}
	}

	public async signIn(
		data: Pick<User, 'id' | 'username'>,
	): Promise<{ accessToken: string }> {
		return {
			accessToken: this._jwtService.sign({
				id: data.id,
				username: data.username,
			}),
		};
	}
}

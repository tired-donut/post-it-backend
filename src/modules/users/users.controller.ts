import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Post } from '../posts/entities/post.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly _usersService: UsersService) {}

	@UseGuards(JwtGuard)
	@Get(':username/posts')
	async findPostsByUsername(
		@Param('username') username: string,
	): Promise<Pick<Post, 'id' | 'content' | 'date'>[]> {
		const posts = await this._usersService.findPostsByUsername({
			username: username,
		});

		return posts;
	}
}

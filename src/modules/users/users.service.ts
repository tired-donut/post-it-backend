import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/entities/post.entity';

@Injectable()
export class UsersService {
	public constructor(
		@InjectRepository(User)
		private readonly _userRepository: Repository<User>,
		private readonly _postsService: PostsService,
	) {}

	public async create(
		data: Pick<User, 'name' | 'username' | 'email' | 'password'>,
	): Promise<Pick<User, 'id' | 'name' | 'username'>> {
		if (
			await this._userRepository.existsBy({
				username: data.username,
			})
		) {
			throw new ConflictException('Username already taken');
		}

		if (
			await this._userRepository.existsBy({
				email: data.email,
			})
		) {
			throw new ConflictException('Email already taken');
		}

		const user = await this._userRepository.save({
			name: data.name,
			username: data.username,
			email: data.email,
			password: data.password,
		});

		return {
			id: user.id,
			name: user.name,
			username: user.username,
		};
	}

	public async findByUsername(data: Pick<User, 'username'>): Promise<User> {
		const user = await this._userRepository.findOneBy({
			username: data.username,
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return {
			id: user.id,
			name: user.name,
			username: user.username,
			email: user.email,
			password: user.password,
		};
	}

	public async findPostsByUsername(
		data: Pick<User, 'username'>,
	): Promise<Pick<Post, 'id' | 'content' | 'date'>[]> {
		const user = await this.findByUsername({ username: data.username });

		return await this._postsService.findByUsername({
			username: user.username,
		});
	}
}

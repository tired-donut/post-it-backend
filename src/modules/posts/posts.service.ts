import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
	public constructor(
		@InjectRepository(Post)
		private readonly _postRepository: Repository<Post>,
	) {}

	public async create(
		data: Pick<Post, 'content'>,
		id: string,
	): Promise<Pick<Post, 'id'>> {
		const post = await this._postRepository.save({
			content: data.content,
			user: { id: id },
		});

		return {
			id: post.id,
		};
	}

	public async findByUsername(
		data: Pick<User, 'username'>,
	): Promise<Pick<Post, 'id' | 'content' | 'date'>[]> {
		const posts = await this._postRepository.find({
			where: { user: { username: data.username } },
		});

		return posts.map((post) => ({
			id: post.id,
			content: post.content,
			date: post.date,
		}));
	}
}

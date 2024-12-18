import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Request,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('posts')
export class PostsController {
	constructor(private readonly _postsService: PostsService) {}

	@UseGuards(JwtGuard)
	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body(new ValidationPipe()) data: CreatePostDto,
		@Request() req: any,
	): Promise<Pick<PostEntity, 'id'>> {
		const post = await this._postsService.create(
			{ content: data.content },
			req.user.id,
		);

		return {
			id: post.id,
		};
	}
}

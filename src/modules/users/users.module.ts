import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { PostsModule } from '../posts/posts.modules';

@Module({
	imports: [TypeOrmModule.forFeature([User]), PostsModule],
	providers: [UsersService],
	exports: [UsersService],
	controllers: [UsersController],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './modules/posts/posts.modules';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.envs/.env',
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DATABASE_HOST,
			port: +process.env.DATABASE_PORT,
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			autoLoadEntities: true,
			synchronize: true,
		}),
		UsersModule,
		AuthModule,
		PostsModule,
	],
	providers: [],
})
export class AppModule {}

import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	@Length(2)
	content: string;
}

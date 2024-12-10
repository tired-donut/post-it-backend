import {
	IsAlphanumeric,
	IsEmail,
	IsNotEmpty,
	IsString,
	Length,
	Matches,
} from 'class-validator';

export class SignUpDto {
	@IsString()
	@IsNotEmpty()
	@Length(2)
	name: string;

	@IsString()
	@IsNotEmpty()
	@Matches(/[a-z][a-z0-9]*/)
	@Length(6, 16)
	username: string;

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	@IsAlphanumeric()
	@Length(8, 24)
	password: string;
}

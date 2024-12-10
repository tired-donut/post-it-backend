import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@Index('uq_users_username', ['username'], { unique: true })
@Index('uq_users_email', ['email'], { unique: true })
export class User {
	@PrimaryGeneratedColumn('uuid', {
		name: 'id',
		primaryKeyConstraintName: 'pkey_users_id',
	})
	id: string;

	@Column({
		name: 'name',
		nullable: false,
	})
	name: string;

	@Column({
		name: 'username',
		nullable: false,
	})
	username: string;

	@Column({
		name: 'email',
		nullable: false,
	})
	email: string;

	@Column({
		name: 'password',
		nullable: false,
	})
	password: string;
}

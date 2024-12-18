import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class Post {
	@PrimaryGeneratedColumn('uuid', {
		name: 'id',
		primaryKeyConstraintName: 'pkey_post_id',
	})
	id: string;

	@Column({ name: 'content', nullable: false })
	content: string;

	@Column({
		name: 'date',
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	date: Date;

	@ManyToOne(() => User, (user) => user.id, {
		nullable: false,
		onDelete: 'CASCADE',
	})
	user: User;
}

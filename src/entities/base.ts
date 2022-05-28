import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
class Base extends BaseEntity {

	protected static schemaName = 'awesomechecker';

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: false })
	isDeleted: boolean;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdTimestamp: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	lastUpdateTimestamp: Date;

}

export { Base };
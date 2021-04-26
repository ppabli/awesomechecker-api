import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Base extends BaseEntity {

	protected static schemaName = "awesomechecker"

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdTimestamp: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	lastUpdateTimestamp: Date;

}
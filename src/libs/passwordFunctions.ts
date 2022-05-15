import * as bcrypt from 'bcryptjs';
import { env } from 'process';

function hashPassword(password: string) {
	return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
}

function comparePassword(password: string, hash: string) {
	return bcrypt.compareSync(password, hash);
}

export { hashPassword, comparePassword };
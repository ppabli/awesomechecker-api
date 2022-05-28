import * as bcrypt from 'bcryptjs';

async function hashPassword(password: string) {
	return await bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
}

async function comparePassword(password: string, hash: string) {
	return await bcrypt.compareSync(password, hash);
}

export { hashPassword, comparePassword };
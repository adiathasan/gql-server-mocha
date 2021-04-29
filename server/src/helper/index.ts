import brypt from 'bcrypt';

const SALT = 10;

export const hashPassword = async (password: string) => {
	try {
		const hashed = await brypt.hash(password, SALT);

		return hashed;
	} catch (error) {
		throw error;
	}
};

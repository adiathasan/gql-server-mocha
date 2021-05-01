import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface PasswordMatch {
	requested: string;
	encrypted: string;
}

const SALT = 10;

export const TOKEN_EXPIRES_IN_DAYS = 2;

export const hashPassword = async (password: string) => {
	try {
		const hashed = await bcrypt.hash(password, SALT);

		return hashed;
	} catch (error) {
		throw error;
	}
};

export const doesPasswordMatched = async ({
	requested,
	encrypted,
}: PasswordMatch) => {
	try {
		const hasMatched = await bcrypt.compare(requested, encrypted);

		return hasMatched;
	} catch (error) {
		throw error;
	}
};

export const makeToken = <T extends object>(data: T) => {
	const SECRET = 'SECURED';

	return jwt.sign(data, SECRET, { expiresIn: TOKEN_EXPIRES_IN_DAYS + 'd' });
};

import { Response, NextFunction } from 'express';
import { verifyToken } from '../helper';

export const isAuthenticated = (
	req: any,
	_res: Response,
	next: NextFunction
) => {
	const authHeader = req.get('Authorization');

	if (!authHeader) {
		req.isAuth = false;

		return next();
	}

	const token = authHeader.replace('Bearer ', '');

	if (!token) {
		req.isAuth = false;

		return next();
	}

	try {
		const decodedToken: any = verifyToken(token);

		if (!decodedToken) {
			req.isAuth = false;

			return next();
		}

		req.isAuth = true;

		req.userId = decodedToken.userId;

		next();
	} catch (error) {
		req.isAuth = false;

		return next();
	}
};

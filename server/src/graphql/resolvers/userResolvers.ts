import { UserInput } from '.';
import {
	doesPasswordMatched,
	hashPassword,
	makeToken,
	TOKEN_EXPIRES_IN_DAYS,
} from '../../helper';
import { User, UserType } from '../../models/user';
import { getEvents } from './index.map';

export interface ILogin {
	email: string;
	password: string;
}

export const transformUser = (user: UserType) => {
	return {
		...user._doc,
		createdEvents: getEvents.bind(this, user.createdEvents),
		createdAt: user.createdAt.toISOString(),
		updatedAt: user.updatedAt.toISOString(),
	};
};

export const userResolvers = {
	Query: {
		users: async () => {
			try {
				const users = await User.find({});

				return users.map((user) => {
					return transformUser(user);
				});
			} catch (error) {
				throw error;
			}
		},
	},

	Mutation: {
		createUser: async (_parent: any, { input }: { input: UserInput }) => {
			try {
				const ERR_MESSAGE = 'User already exists with this email';

				const { email, password } = input;

				const existsUser = await User.findOne({ email });

				if (existsUser) throw new Error(ERR_MESSAGE);

				const user = new User({
					email,
					password: await hashPassword(password),
				});

				const newUser = await user.save();

				return transformUser(newUser);
			} catch (error) {
				throw error;
			}
		},
		login: async (_parent: any, { input }: { input: ILogin }) => {
			try {
				const ERR_MESSAGE = 'Invalid email/password';

				const { email, password } = input;

				const user = await User.findOne({ email });

				if (!user) throw new Error(ERR_MESSAGE);

				const isPasswordInvalid = !(await doesPasswordMatched({
					requested: password,
					encrypted: user.password,
				}));

				if (isPasswordInvalid) throw new Error(ERR_MESSAGE);

				const token = makeToken({ userId: user.id, email: user.email });

				return {
					userId: user.id,
					token,
					tokenExpirationTimeInDays: TOKEN_EXPIRES_IN_DAYS,
				};
			} catch (error) {
				throw error;
			}
		},
	},
};

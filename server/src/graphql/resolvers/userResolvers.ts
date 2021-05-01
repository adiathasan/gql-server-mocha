import { UserInput } from '.';
import { hashPassword } from '../../helper';
import { User, UserType } from '../../models/user';
import { getEvents } from './index.map';

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
		createUser: async (
			_parent: any,
			{ input: { email, password } }: { input: UserInput }
		) => {
			try {
				const existsUser = await User.findOne({ email });

				if (existsUser) throw new Error('User already exists with this email');

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
	},
};

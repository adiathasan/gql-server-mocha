import { User } from '../../models/user';
import { Event } from '../../models/event';
import { getCreator, getEvents } from './index.map';
import { hashPassword } from '../../helper';

export interface EventInput {
	title: string;
	description: string;
	price: number;
	date: string;
}

export interface UserInput {
	email: string;
	password: string;
}

// @resolvers

export const resolvers = {
	Query: {
		events: async () => {
			try {
				const events = await Event.find({});

				return events.map((event) => {
					return {
						...event._doc,
						creator: getCreator.bind(this, event.creator),
					};
				});
			} catch (error) {
				throw error;
			}
		},

		users: async () => {
			try {
				const users = await User.find({});

				return users.map((user) => {
					return {
						...user._doc,
						createdEvents: getEvents.bind(this, user.createdEvents),
					};
				});
			} catch (error) {
				throw error;
			}
		},
	},

	Mutation: {
		createEvent: async (
			_parent: any,
			{ input: { title, date, description, price } }: { input: EventInput }
		) => {
			try {
				const user = await User.findById('608c32c0584f8578f0cde3e7');

				if (!user) throw new Error('User not found');

				const event = new Event({
					title,
					description,
					price,
					date: new Date(date),
					creator: user._id,
				});

				const newEvent = await event.save();

				user.createdEvents.push(newEvent._id);

				await user.save();

				return {
					...newEvent._doc,
					creator: getCreator.bind(this, newEvent.creator),
				};
			} catch (error) {
				throw error;
			}
		},

		createUser: async (
			_parent: any,
			{ input: { email, password } }: { input: UserInput }
		) => {
			try {
				const existsUser = await User.findOne({ email });

				if (existsUser) throw new Error('User already exits with this email');

				const user = new User({
					email,
					password: await hashPassword(password),
				});

				const userData = await user.save();

				return { ...userData._doc };
			} catch (error) {
				throw error;
			}
		},
	},
};

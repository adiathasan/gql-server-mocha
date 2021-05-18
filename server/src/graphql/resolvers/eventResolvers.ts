import { IResolvers } from 'graphql-tools';
import { EventInput } from '.';
import { Event, EventType } from '../../models/event';
import { User } from '../../models/user';
import { getCreator } from './index.map';

export const transformEvent = (event: EventType) => {
	return {
		...event._doc,
		date: event.date.toISOString(),
		createdAt: event.createdAt.toISOString(),
		updatedAt: event.updatedAt.toISOString(),
		creator: getCreator.bind(this, event.creator),
	};
};

export const eventResolvers: IResolvers = {
	Query: {
		events: async (_parent: any, _args: any, ctx: any) => {
			const isAuth = ctx.req.isAuth;

			if (isAuth) {
				console.log(ctx.req.userId);
			}

			try {
				const events = await Event.find({});

				return events.map((event) => {
					return transformEvent(event);
				});
			} catch (error) {
				throw error;
			}
		},
	},

	Mutation: {
		createEvent: async (
			_parent: any,
			{ input: { title, date, description, price } }: { input: EventInput },
			ctx: any
		) => {
			try {
				const isAuth = ctx.req.isAuth;

				if (!isAuth) throw new Error('Not Authorized To Create Events');

				const { userId } = ctx.req;

				const user = await User.findById(userId);

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

				return transformEvent(newEvent);
			} catch (error) {
				throw error;
			}
		},
	},
};

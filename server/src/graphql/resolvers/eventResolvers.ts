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

export const eventResolvers = {
	Query: {
		events: async (parent: any, args: any, ctx: any) => {
			console.log(ctx.req.headers);

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
			{ input: { title, date, description, price } }: { input: EventInput }
		) => {
			try {
				const user = await User.findById('608ce7aeeff2e064a819b017');

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

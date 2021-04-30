import { User } from '../../models/user';
import { Event } from '../../models/event';

// @getters

export const getEvents = async (eventIds: string[]): Promise<any> => {
	try {
		const events = await Event.find({ _id: { $in: eventIds } });

		return events.map((event) => {
			return {
				...event._doc,
				creator: getCreator.bind(this, event.creator),
			};
		});
	} catch (error) {
		throw error;
	}
};

export const getCreator = async (userId: string): Promise<any> => {
	try {
		const user = await User.findById(userId);

		if (!user) throw new Error('User not found');

		return {
			...user._doc,
			createdEvents: getEvents.bind(this, user.createdEvents),
		};
	} catch (error) {
		throw error;
	}
};

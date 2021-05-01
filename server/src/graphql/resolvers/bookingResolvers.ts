import { Booking, BookingType } from '../../models/booking';
import { Event } from '../../models/event';
import { getCreator, getEvent } from './index.map';

export const transformBooking = (booking: BookingType) => {
	return {
		...booking._doc,
		user: getCreator.bind(this, booking.user),
		event: getEvent.bind(this, booking.event),
		createdAt: booking.createdAt.toISOString(),
		updatedAt: booking.updatedAt.toISOString(),
	};
};

export const bookingResolvers = {
	Query: {
		bookings: async () => {
			try {
				const bookings = await Booking.find({});

				return bookings.map((booking) => {
					return transformBooking(booking);
				});
			} catch (error) {
				throw error;
			}
		},
	},

	Mutation: {
		bookEvent: async (
			_parent: any,
			{ input: { eventId } }: { input: { eventId: string } }
		) => {
			try {
				const fetchedEvent = await Event.findById(eventId);

				if (!fetchedEvent) throw new Error('Event not found to book');

				const booking = new Booking({
					event: eventId,
					user: '608cf76c2abc533434780f57',
				});

				const newBooking = await booking.save();

				return transformBooking(newBooking);
			} catch (error) {
				throw error;
			}
		},
	},
};

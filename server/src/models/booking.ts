import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking {
	event: string;
	user: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface BookingType extends Document<any, IBooking>, IBooking {}

const bookingScheme = new Schema(
	{
		event: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Booking = mongoose.model<BookingType>('booking', bookingScheme);

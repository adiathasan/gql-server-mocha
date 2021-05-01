import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent {
	title: string;
	description: string;
	price: number;
	date: Date;
	creator: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface EventType extends Document<any, IEvent>, IEvent {}

const eventSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
	},
	{ timestamps: true }
);

export const Event = mongoose.model<EventType>('event', eventSchema);

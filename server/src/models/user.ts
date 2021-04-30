import mongoose, { Schema, Document } from 'mongoose';

interface Iuser {
	email: string;
	password: string;
	createdEvents: string[];
}

interface UserType extends Document<any, Iuser>, Iuser {}

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdEvents: [
		{
			type: Schema.Types.ObjectId,
			ref: 'event',
		},
	],
});

export const User = mongoose.model<UserType>('user', userSchema);

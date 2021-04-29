import mongoose, { Schema, Document } from 'mongoose';

interface UserType extends Document {
	email: string;
	password: string;
}

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

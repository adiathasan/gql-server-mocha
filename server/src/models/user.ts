import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
	email: string;
	password: string;
	createdEvents: string[];
	createdAt: Date;
	updatedAt: Date;
}

export interface UserType extends Document<any, IUser>, IUser {}

const userSchema = new Schema(
	{
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
	},
	{ timestamps: true }
);

export const User = mongoose.model<UserType>('user', userSchema);

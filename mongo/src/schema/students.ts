import * as mongoose from 'mongoose';

export interface StudentType extends mongoose.Document {
	name: string;
}

const Schema = mongoose.Schema;

const StudentScheme = new Schema({
	name: {
		type: String,
		required: true,
	},
});

export const Student = mongoose.model<StudentType>('student', StudentScheme);

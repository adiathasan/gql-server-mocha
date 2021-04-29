import express, { Application, Request, Response } from 'express';
import { ApolloServer, gql } from 'apollo-server';
import { connectDb } from './config/db';
import { Event } from './models/event';
import { User } from './models/user';
import { hashPassword } from './helper';

interface EventCustome {
	title: string;
	description: string;
	price: number;
	date: string;
}
interface UserCustome {
	email: string;
	password: string;
}

const typeDefs = gql`
	type Event {
		_id: ID!
		title: String!
		description: String!
		price: Float!
		date: String!
		creator: User!
	}

	type User {
		_id: ID!
		email: String!
		password: String!
		createdEvents: [Event!]!
	}

	input UserInput {
		email: String!
		password: String!
	}

	input EventInput {
		title: String!
		description: String!
		price: Float!
		date: String!
	}

	type Query {
		events: [Event!]!
		users: [User!]!
	}

	type Mutation {
		createEvent(input: EventInput): Event!
		createUser(input: UserInput): User!
	}
`;

const resolvers = {
	Query: {
		events: async () => {
			try {
				const events = await Event.find({});

				return events;
			} catch (error) {
				throw error;
			}
		},

		users: async () => {
			try {
				const users = await User.find({});

				return users;
			} catch (error) {
				throw error;
			}
		},
	},

	Mutation: {
		createEvent: async (
			_parent: any,
			{ input: { title, date, description, price } }: { input: EventCustome }
		) => {
			const event = new Event({
				title,
				description,
				price,
				date: new Date(date),
			});

			try {
				const newEvent = await event.save();

				return newEvent;
			} catch (error) {
				throw error;
			}
		},

		createUser: async (
			_parent: any,
			{ input: { email, password } }: { input: UserCustome }
		) => {
			try {
				const existsUser = await User.findOne({ email });

				if (existsUser) throw new Error('User already exits with this email');

				const user = new User({
					email,
					password: await hashPassword(password),
				});

				const userData = await user.save();

				return userData;
			} catch (error) {
				throw error;
			}
		},
	},
};

const gqlServer = new ApolloServer({ typeDefs, resolvers });

const app: Application = express();

connectDb(() => {
	// graphql server

	gqlServer.listen(8080, () => {
		console.log('gql server running');
	});

	// express server

	app.get('/', (_req: Request, res: Response) => {
		res.json({ title: 'shit' });
	});

	app.listen(4000, () => {
		console.log('running');
	});
});

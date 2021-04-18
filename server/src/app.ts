import express, { Application, Request, Response } from 'express';
import { ApolloServer, gql } from 'apollo-server';

interface Event {
	name: string;
	description: string;
	price: number;
	date: string;
}

interface MongoEvent extends Event {
	_id: string;
}

const events: MongoEvent[] = [];

const typeDefs = gql`
	type Event {
		_id: ID!
		name: String!
		description: String!
		price: Float!
		date: String!
	}

	input EventInput {
		name: String!
		description: String!
		price: Float!
		date: String!
	}

	type Query {
		events: [Event!]!
	}

	type Mutation {
		addEvent(event: EventInput): Event!
	}
`;

const resolvers = {
	Query: {
		events: (): MongoEvent[] => {
			return events;
		},
	},

	Mutation: {
		addEvent: (
			_parent: any,
			{ event: { name, date, description, price } }: { event: Event }
		): MongoEvent => {
			events.push({
				name,
				date,
				description,
				price,
				_id: Math.random().toString(),
			});

			return { name, date, description, price, _id: Math.random().toString() };
		},
	},
};

// graphql server

const gqlServer = new ApolloServer({ typeDefs, resolvers });

gqlServer.listen(8080, () => {
	console.log('gql server running');
});

// express server

const app: Application = express();

app.get('/', (_req: Request, res: Response) => {
	res.json({ name: 'shit' });
});

app.listen(3000, () => {
	console.log('running');
});

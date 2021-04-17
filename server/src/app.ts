import express, { Application, Request, Response } from 'express';
import { ApolloServer, gql } from 'apollo-server';

const books = [
	{ name: 'love at night', author: 'shit-hole' },
	{ name: 'love at day', author: 'git-hole' },
];

const typeDefs = gql`
	type Book {
		name: String!
		author: String!
	}

	type Query {
		books: [Book]!
	}
`;

const resolvers = {
	Query: {
		books: () => {
			return books;
		},
	},
};

// graphql server

const gqlServer = new ApolloServer({ typeDefs, resolvers });

gqlServer.listen(8000, () => {
	console.log('gql server running');
});

// express server

const app: Application = express();

app.get('/', (_req: Request, res: Response) => {
	res.json({ name: 'shit' });
});

app.listen(5000, () => {
	console.log('running');
});

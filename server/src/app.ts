import express, { Application, Request, Response } from 'express';
import { ApolloServer, gql } from 'apollo-server';

interface Book {
	name: string;
	author: string;
}

interface Author {
	name: string;
	books: Book[];
}

const books: Book[] = [
	{ name: 'love at night', author: 'shit-hole' },
	{ name: 'love at day', author: 'git-hole' },
];

const authors: Author[] = [
	{
		name: 'shit-hole',
		books: [{ name: 'love at night', author: 'shit-hole' }],
	},
];

const typeDefs = gql`
	type Book {
		name: String!
		author: String!
	}

	type Author {
		name: String!
		books: [Book!]!
	}

	type Query {
		books: [Book!]!
		authors: [Author!]!
	}

	type Mutation {
		addBook(add: AddBook): [Book]
	}

	input AddBook {
		name: String!
		author: String!
	}
`;

const resolvers = {
	Query: {
		books: () => {
			return books;
		},
		authors: () => {
			return authors;
		},
	},

	Mutation: {
		addBook: (_parent: any, { add: { name, author } }: { add: Book }) => {
			books.push({ name, author });

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

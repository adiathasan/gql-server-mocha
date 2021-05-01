import express, { Application, Request, Response } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import { connectDb } from './config/db';
import { userTypeDefs } from './graphql/schema/user.td';
import { eventTypeDefs } from './graphql/schema/event.td';
import { bookingTypeDefs } from './graphql/schema/booking.td';
import { resolvers } from './graphql/resolvers/index';

const baseTypeDefs = gql`
	type Query
	type Mutation
`;

const app: Application = express();

const gqlServer = new ApolloServer({
	typeDefs: [baseTypeDefs, userTypeDefs, eventTypeDefs, bookingTypeDefs],
	resolvers,
	context: ({ req, res }) => ({ req, res }),
});

gqlServer.applyMiddleware({ app });

connectDb(() => {
	// server

	app.get('/', (_req: Request, res: Response) => {
		res.json({ title: 'shit' });
	});

	app.listen(4000, () => {
		console.log('running');
	});
});

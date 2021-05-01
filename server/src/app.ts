// import express, { Application, Request, Response } from 'express';
import { ApolloServer, gql } from 'apollo-server';

import { connectDb } from './config/db';
import { userTypeDefs } from './graphql/schema/user.td';
import { eventTypeDefs } from './graphql/schema/event.td';
import { bookingTypeDefs } from './graphql/schema/booking.td';
import { resolvers } from './graphql/resolvers/index';

const baseTypeDefs = gql`
	type Query
	type Mutation
`;

const gqlServer = new ApolloServer({
	typeDefs: [baseTypeDefs, userTypeDefs, eventTypeDefs, bookingTypeDefs],
	resolvers,
});

// const app: Application = express();

connectDb(() => {
	// graphql server

	gqlServer.listen(8080, () => {
		console.log('gql server running');
	});

	// express server

	// app.get('/', (_req: Request, res: Response) => {
	// 	res.json({ title: 'shit' });
	// });

	// app.listen(4000, () => {
	// 	console.log('running');
	// });
});

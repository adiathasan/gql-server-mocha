import express, { Application, Request, Response } from 'express';
import { ApolloServer } from 'apollo-server';

import { connectDb } from './config/db';
import { typeDefs } from './graphql/schema/index';
import { resolvers } from './graphql/resolvers/index';

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

	app.listen(8000, () => {
		console.log('running');
	});
});

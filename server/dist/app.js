'use strict';
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const apollo_server_1 = require('apollo-server');
const db_1 = require('./config/db');
const index_1 = require('./graphql/schema/index');
const index_2 = require('./graphql/resolvers/index');
const gqlServer = new apollo_server_1.ApolloServer({
	typeDefs: index_1.typeDefs,
	resolvers: index_2.resolvers,
});
const app = express_1.default();
db_1.connectDb(() => {
	// graphql server
	gqlServer.listen(8000, () => {
		console.log('gql server running');
	});
	// express server
	app.get('/', (_req, res) => {
		res.json({ title: 'shit' });
	});
	app.listen(3000, () => {
		console.log('running');
	});
});

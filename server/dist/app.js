"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_1 = require("apollo-server");
const books = [
    { name: 'love at night', author: 'shit-hole' },
    { name: 'love at day', author: 'git-hole' },
];
const typeDefs = apollo_server_1.gql `
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
const gqlServer = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
gqlServer.listen(8000, () => {
    console.log('gql server running');
});
// express server
const app = express_1.default();
app.get('/', (_req, res) => {
    res.json({ name: 'shit' });
});
app.listen(5000, () => {
    console.log('running');
});

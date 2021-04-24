"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_1 = require("apollo-server");
const events = [];
const typeDefs = apollo_server_1.gql `
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
        events: () => {
            return events;
        },
    },
    Mutation: {
        addEvent: (_parent, { event: { name, date, description, price } }) => {
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
const gqlServer = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
gqlServer.listen(8080, () => {
    console.log('gql server running');
});
// express server
const app = express_1.default();
app.get('/', (_req, res) => {
    res.json({ name: 'shit' });
});
app.listen(3000, () => {
    console.log('running');
});

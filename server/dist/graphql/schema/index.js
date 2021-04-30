"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = apollo_server_1.gql `
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

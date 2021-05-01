import { gql } from 'apollo-server-express';

export const eventTypeDefs = gql`
	type Event {
		_id: ID!
		creator: User!
		title: String!
		description: String!
		price: Float!
		date: String!
		createdAt: String!
		updatedAt: String!
	}

	input EventInput {
		title: String!
		description: String!
		price: Float!
		date: String!
	}

	extend type Query {
		events: [Event!]!
	}

	extend type Mutation {
		createEvent(input: EventInput): Event!
	}
`;

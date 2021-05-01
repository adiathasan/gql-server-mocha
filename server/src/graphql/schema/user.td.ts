import { gql } from 'apollo-server';

export const userTypeDefs = gql`
	type User {
		_id: ID!
		email: String!
		password: String!
		createdEvents: [Event!]!
		createdAt: String!
		updatedAt: String!
	}

	input UserInput {
		email: String!
		password: String!
	}

	extend type Query {
		users: [User!]!
	}

	extend type Mutation {
		createUser(input: UserInput): User!
	}
`;

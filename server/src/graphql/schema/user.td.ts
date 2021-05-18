import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
	type User {
		_id: ID!
		email: String!
		password: String!
		createdEvents: [Event!]!
		createdAt: String!
		updatedAt: String!
	}

	type AuthData {
		userId: String!
		token: String!
		tokenExpirationTimeInDays: Int!
	}

	input UserInput {
		email: String!
		password: String!
	}

	input LoginInput {
		email: String!
		password: String!
	}

	extend type Query {
		users: [User!]!
	}

	extend type Mutation {
		createUser(input: UserInput): User!
		login(input: LoginInput): AuthData!
	}
`;

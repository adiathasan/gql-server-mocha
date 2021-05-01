import { gql } from 'apollo-server-express';

export const bookingTypeDefs = gql`
	type Booking {
		_id: ID!
		event: Event!
		user: User!
		createdAt: String!
		updatedAt: String!
	}

	input BookingInput {
		eventId: ID!
	}

	extend type Query {
		bookings: [Booking!]!
	}

	extend type Mutation {
		bookEvent(input: BookingInput): Booking!
	}
`;

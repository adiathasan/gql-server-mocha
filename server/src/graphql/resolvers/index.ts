import _ from 'lodash';

import { userResolvers } from './userResolvers';
import { eventResolvers } from './eventResolvers';
import { bookingResolvers } from './bookingResolvers';

export interface EventInput {
	title: string;
	description: string;
	price: number;
	date: string;
}

export interface UserInput {
	email: string;
	password: string;
}

// @resolvers

export const resolvers = _.merge(
	{},
	userResolvers,
	eventResolvers,
	bookingResolvers
);

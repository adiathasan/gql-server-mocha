"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_1 = require("../../models/user");
const event_1 = require("../../models/event");
const index_map_1 = require("./index.map");
const helper_1 = require("../../helper");
// @resolvers
exports.resolvers = {
    Query: {
        events: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const events = yield event_1.Event.find({});
                return events.map((event) => {
                    return Object.assign(Object.assign({}, event._doc), { creator: index_map_1.getCreator.bind(this, event.creator) });
                });
            }
            catch (error) {
                throw error;
            }
        }),
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield user_1.User.find({});
                return users.map((user) => {
                    return Object.assign(Object.assign({}, user._doc), { createdEvents: index_map_1.getEvents.bind(this, user.createdEvents) });
                });
            }
            catch (error) {
                throw error;
            }
        }),
    },
    Mutation: {
        createEvent: (_parent, { input: { title, date, description, price } }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findById('608c32c0584f8578f0cde3e7');
                if (!user)
                    throw new Error('User not found');
                const event = new event_1.Event({
                    title,
                    description,
                    price,
                    date: new Date(date),
                    creator: user._id,
                });
                const newEvent = yield event.save();
                user.createdEvents.push(newEvent._id);
                yield user.save();
                return Object.assign(Object.assign({}, newEvent._doc), { creator: index_map_1.getCreator.bind(this, newEvent.creator) });
            }
            catch (error) {
                throw error;
            }
        }),
        createUser: (_parent, { input: { email, password } }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const existsUser = yield user_1.User.findOne({ email });
                if (existsUser)
                    throw new Error('User already exits with this email');
                const user = new user_1.User({
                    email,
                    password: yield helper_1.hashPassword(password),
                });
                const userData = yield user.save();
                return Object.assign({}, userData._doc);
            }
            catch (error) {
                throw error;
            }
        }),
    },
};

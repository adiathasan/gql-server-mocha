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
exports.getCreator = exports.getEvents = void 0;
const user_1 = require("../../models/user");
const event_1 = require("../../models/event");
// @getters
const getEvents = (eventIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_1.Event.find({ _id: { $in: eventIds } });
        return events.map((event) => {
            return Object.assign(Object.assign({}, event._doc), { creator: exports.getCreator.bind(this, event.creator) });
        });
    }
    catch (error) {
        throw error;
    }
});
exports.getEvents = getEvents;
const getCreator = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(userId);
        if (!user)
            throw new Error('User not found');
        return Object.assign(Object.assign({}, user._doc), { createdEvents: exports.getEvents.bind(this, user.createdEvents) });
    }
    catch (error) {
        throw error;
    }
});
exports.getCreator = getCreator;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const students_1 = require("../schema/students");
describe('Create test', () => {
    it('create a user in students collection', () => {
        const student = new students_1.Student({ name: 'creater' });
        student
            .save()
            .then(() => {
            const isSaved = !student.isNew;
            assert_1.default(isSaved);
        })
            .catch((err) => {
            console.log('catch => ', err);
        });
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const students_1 = require("../schema/students");
describe('Update test', () => {
    const NAME = 'updater';
    beforeEach((done) => {
        const user = new students_1.Student({ name: NAME });
        user.save().then(() => {
            done();
        });
    });
    it('update from students collection', (done) => {
        students_1.Student.findOneAndUpdate({ name: NAME }, { name: 'updated' })
            .then((student) => students_1.Student.findOne({ name: student === null || student === void 0 ? void 0 : student.name }))
            .then((stu) => {
            assert_1.default((stu === null || stu === void 0 ? void 0 : stu.name) !== NAME);
            done();
        });
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const students_1 = require("../schema/students");
describe('Read test', () => {
    let _id;
    const NAME = 'reader';
    beforeEach((done) => {
        const user = new students_1.Student({ name: NAME });
        user.save().then((data) => {
            _id = data._id.toString();
            done();
        });
    });
    it('read from students collection', (done) => {
        students_1.Student.findOne({ name: NAME }).then((student) => {
            const isFound = _id === (student === null || student === void 0 ? void 0 : student._id.toString());
            assert_1.default(isFound);
            done();
        });
    });
});

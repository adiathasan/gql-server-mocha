"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const students_1 = require("../schema/students");
describe('Delete test', () => {
    let _id;
    const NAME = 'deleter';
    beforeEach((done) => {
        const user = new students_1.Student({ name: NAME });
        user.save().then((data) => {
            _id = data._id.toString();
            done();
        });
    });
    it('delete from students collection', (done) => {
        students_1.Student.findByIdAndDelete(_id)
            .then((student) => students_1.Student.findById(student === null || student === void 0 ? void 0 : student._id))
            .then((student) => {
            assert_1.default(student === null);
            done();
        });
    });
});

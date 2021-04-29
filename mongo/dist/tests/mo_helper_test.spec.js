"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const beforeCb = (done) => {
    db_1.dbConnect(done);
};
const beforeEachCb = (done) => {
    db_1.dropCollection('students', done);
};
before(beforeCb);
beforeEach(beforeEachCb);

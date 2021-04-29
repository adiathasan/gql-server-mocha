"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropCollection = exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const MONGO_URI_KEY = process.env.MONGO_URI_KEY || `mongodb://localhost/stuhub`;
mongoose_1.default.connect(MONGO_URI_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const dbConnect = (cb) => {
    mongoose_1.default.connection
        .once('open', () => {
        if (cb) {
            cb();
        }
        // console.log('mongo connected for test');
    })
        .on('error', (error) => {
        console.log('Its an Error: ', error);
    });
};
exports.dbConnect = dbConnect;
const dropCollection = (name, cd) => {
    mongoose_1.default.connection.db.dropCollection(name, () => {
        if (cd) {
            cd();
        }
        // console.log(`collection dropped ${name}`);
    });
};
exports.dropCollection = dropCollection;

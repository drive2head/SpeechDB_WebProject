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
exports.addRecord = exports.getAllRecords = void 0;
const mongoose = __importStar(require("mongoose"));
const cfg_1 = require("./cfg");
const mongoose_1 = require("mongoose");
const model_1 = require("./model");
const ObjectId = mongoose.Schema.Types.ObjectId;
function connect() {
    return mongoose_1.createConnection(cfg_1.audio_db_uri, { useNewUrlParser: true, useUnifiedTopology: true });
}
function getAllRecords() {
    return __awaiter(this, void 0, void 0, function* () {
        const audio_connections = connect();
        try {
            const Record = audio_connections.model('Record', model_1.recordSchema);
            return yield Record.find();
        }
        finally {
            audio_connections.close();
        }
    });
}
exports.getAllRecords = getAllRecords;
function findRecordByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const audio_connections = connect();
        try {
            const Record = audio_connections.model('Record', model_1.recordSchema);
            return yield Record.findOne({ name: name });
        }
        finally {
            audio_connections.close();
        }
    });
}
function addRecord(name, path, speakerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const audio_connections = connect();
        try {
            const Record = audio_connections.model('Record', model_1.recordSchema);
            const record = yield findRecordByName(name);
            if (record) {
                return null;
            }
            let newRecord = new Record({ name: name, path: path, speakerId: speakerId });
            newRecord = yield newRecord.save();
            return newRecord;
        }
        catch (err) {
            return null;
        }
        finally {
            audio_connections.close();
        }
    });
}
exports.addRecord = addRecord;

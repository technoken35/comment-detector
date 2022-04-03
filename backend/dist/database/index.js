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
const mongodb_1 = require("mongodb");
class DatabaseHelper {
    constructor(database) {
        this.database = database;
    }
    getClient() {
        if (!this.client) {
            this.client = new mongodb_1.MongoClient(process.env.DB_CONNECTION_URI || '');
        }
        this.openConnection().catch(console.error);
        return this.client;
    }
    closeConnection() {
        var _a;
        (_a = this.client) === null || _a === void 0 ? void 0 : _a.close();
    }
    openConnection() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.connect();
        });
    }
    createCollection(name, closeConnection = false) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.getClient();
            let collection;
            try {
                collection = yield ((_a = this.client) === null || _a === void 0 ? void 0 : _a.db(this.database).createCollection(name));
            }
            catch (_b) {
            }
            finally {
                if (closeConnection)
                    this.closeConnection();
            }
            return collection;
        });
    }
}

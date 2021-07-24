"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const lodash_1 = require("lodash");
const User_1 = __importDefault(require("../models/User"));
const getUsers = (request, response, next) => {
    console.log('getUsers');
    getUsersFromDb()
        .then((users) => {
        console.log('puzzlesMetadata');
        console.log(users);
        response.json(users);
    });
};
exports.getUsers = getUsers;
const getUsersFromDb = () => {
    const users = [];
    const query = User_1.default.find({});
    const promise = query.exec();
    return promise
        .then((userDocs) => {
        if (lodash_1.isArray(userDocs) && userDocs.length > 0) {
            for (const userDoc of userDocs) {
                const userDocData = userDoc.toObject();
                const user = {
                    userName: userDocData.userName,
                    password: userDocData.password,
                    email: userDocData.email,
                    cellTextColorPartnerBoard: userDocData.cellTextColorPartnerBoard,
                };
                users.push(user);
            }
            return Promise.resolve(users);
        }
        else {
            debugger;
            return Promise.reject('users not found');
        }
    }).catch((err) => {
        console.log(err);
        debugger;
        return Promise.reject(err);
    });
};
//# sourceMappingURL=users.js.map
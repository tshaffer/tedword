"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPuzzle = exports.createUserDocument = void 0;
const Puzzle_1 = __importDefault(require("../models/Puzzle"));
const User_1 = __importDefault(require("../models/User"));
const createUserDocument = (userEntity) => {
    return User_1.default.create(userEntity)
        .then((user) => {
        return Promise.resolve(user);
    });
};
exports.createUserDocument = createUserDocument;
const createPuzzle = (puzzleEntity) => {
    return Puzzle_1.default.create(puzzleEntity)
        .then((puzzle) => {
        return Promise.resolve(puzzle);
    });
};
exports.createPuzzle = createPuzzle;
// export const createUserDocuments = (userDocuments: UserEntity[]): Promise<Document[]> => {
//   return new Promise((resolve: any, reject: any) => {
//     User.collection.insert(userDocuments, (err, docs) => {
//       if (err) {
//         console.log(err);
//         if (err.code === 11000) {
//           console.log('createUserDocuments: duplicate key error');
//           resolve([]);
//         } else {
//           reject(err);
//         }
//       }
//       else {
//         console.log(docs);
//         resolve(docs);
//       }
//     });
//   });
// };
//# sourceMappingURL=dbInterface.js.map
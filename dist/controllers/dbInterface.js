"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLastPlayedDateTimeDb = exports.addUserToBoardDb = exports.updateCellContents = exports.createBoardDocument = exports.getBoardsFromDb = exports.createPuzzle = exports.createUserDocument = void 0;
const lodash_1 = require("lodash");
const Board_1 = __importDefault(require("../models/Board"));
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
const getBoardsFromDb = () => {
    const query = Board_1.default.find({});
    const promise = query.exec();
    return promise.then((boardDocuments) => {
        console.log('boardDocuments');
        console.log(boardDocuments);
        const boardEntities = boardDocuments.map((boardDocument) => {
            const boardDocAsObj = boardDocument.toObject();
            const boardEntity = boardDocument.toObject();
            boardEntity.cellContents = {};
            const cellContentsMap = boardDocAsObj.cellContents;
            for (const key of cellContentsMap.keys()) {
                boardEntity.cellContents[key] = cellContentsMap.get(key);
            }
            return boardEntity;
        });
        return Promise.resolve(boardEntities);
    });
};
exports.getBoardsFromDb = getBoardsFromDb;
const createBoardDocument = (boardEntity) => {
    return Board_1.default.create(boardEntity)
        .then((board) => {
        return Promise.resolve(board);
    });
};
exports.createBoardDocument = createBoardDocument;
const updateCellContents = (boardId, user, row, col, typedChar) => {
    console.log('updateCellContents');
    console.log(boardId);
    console.log(user);
    console.log(row);
    console.log(col);
    console.log(typedChar);
    Board_1.default.find({
        id: boardId,
    }, (err, boardDocs) => {
        if (lodash_1.isArray(boardDocs) && boardDocs.length === 1) {
            const boardDoc = boardDocs[0];
            dumpCellContents(boardDoc.cellContents);
            const key = row.toString() + '_' + col.toString();
            const cellContentsValue = {
                user,
                typedChar
            };
            boardDoc.cellContents.set(key, cellContentsValue);
            dumpCellContents(boardDoc.cellContents);
            boardDoc.save();
        }
    });
    const dumpCellContents = (map) => {
        console.log('dumpCellContents');
        for (const key of map.keys()) {
            console.log(key);
        }
        for (const val of map.values()) {
            console.log(val);
        }
    };
};
exports.updateCellContents = updateCellContents;
const addUserToBoardDb = (boardId, userName) => {
    Board_1.default.find({
        id: boardId,
    }, (err, boardDocs) => {
        if (err) {
            console.log(err);
        }
        else 
        // TEDTODO - check for user already exists in .users
        if (lodash_1.isArray(boardDocs) && boardDocs.length === 1) {
            const boardDoc = boardDocs[0];
            boardDoc.users.push(userName);
            boardDoc.save();
        }
    });
};
exports.addUserToBoardDb = addUserToBoardDb;
const updateLastPlayedDateTimeDb = (boardId, lastPlayedDateTime) => {
    Board_1.default.find({
        id: boardId,
    }, (err, boardDocs) => {
        if (err) {
            console.log(err);
        }
        else 
        // TEDTODO - check for user already exists in .users
        if (lodash_1.isArray(boardDocs) && boardDocs.length === 1) {
            const boardDoc = boardDocs[0];
            boardDoc.lastPlayedDateTime = lastPlayedDateTime;
            boardDoc.save();
        }
    });
};
exports.updateLastPlayedDateTimeDb = updateLastPlayedDateTimeDb;
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
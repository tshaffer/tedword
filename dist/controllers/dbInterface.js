"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatSessionDocument = exports.getChatSession = exports.addChatMessageToDb = exports.updateElapsedTimeDb = exports.updateLastPlayedDateTimeDb = exports.addUserToBoardDb = exports.updateCellContents = exports.createBoardDocument = exports.getBoardsFromDb = exports.createPuzzle = exports.createUserDocument = void 0;
const lodash_1 = require("lodash");
const Board_1 = __importDefault(require("../models/Board"));
const ChatSession_1 = __importDefault(require("../models/ChatSession"));
const Puzzle_1 = __importDefault(require("../models/Puzzle"));
const User_1 = __importDefault(require("../models/User"));
exports.createUserDocument = (userEntity) => {
    return User_1.default.create(userEntity)
        .then((user) => {
        return Promise.resolve(user);
    });
};
exports.createPuzzle = (puzzleEntity) => {
    return Puzzle_1.default.create(puzzleEntity)
        .then((puzzle) => {
        return Promise.resolve(puzzle);
    });
};
exports.getBoardsFromDb = () => {
    const query = Board_1.default.find({});
    const promise = query.exec();
    return promise.then((boardDocuments) => {
        console.log('boardDocuments');
        // console.log(boardDocuments);
        const boardEntities = boardDocuments.map((boardDocument) => {
            console.log('boardDocument', boardDocument);
            const boardDocAsObj = boardDocument.toObject();
            console.log('boardDocAsObj', boardDocAsObj);
            const boardEntity = boardDocument.toObject();
            console.log('boardEntity', boardEntity);
            boardEntity.cellContents = {};
            const cellContentsMap = boardDocAsObj.cellContents;
            console.log('cellContentsMap', cellContentsMap);
            if (!lodash_1.isNil(cellContentsMap)) {
                for (const key of cellContentsMap.keys()) {
                    boardEntity.cellContents[key] = cellContentsMap.get(key);
                }
            }
            return boardEntity;
        });
        return Promise.resolve(boardEntities);
    });
};
exports.createBoardDocument = (boardEntity) => {
    return Board_1.default.create(boardEntity)
        .then((board) => {
        return Promise.resolve(board);
    });
};
exports.updateCellContents = (boardId, user, row, col, typedChar) => {
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
exports.addUserToBoardDb = (boardId, userName) => {
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
exports.updateLastPlayedDateTimeDb = (boardId, lastPlayedDateTime) => {
    Board_1.default.find({ id: boardId, }, (err, boardDocs) => {
        if (err) {
            console.log(err);
        }
        else if (lodash_1.isArray(boardDocs) && boardDocs.length === 1) {
            const boardDoc = boardDocs[0];
            boardDoc.lastPlayedDateTime = lastPlayedDateTime;
            boardDoc.save();
        }
    });
};
exports.updateElapsedTimeDb = (boardId, elapsedTime) => {
    Board_1.default.find({ id: boardId, }, (err, boardDocs) => {
        if (err) {
            console.log(err);
        }
        else if (lodash_1.isArray(boardDocs) && boardDocs.length === 1) {
            const boardDoc = boardDocs[0];
            boardDoc.elapsedTime = elapsedTime;
            boardDoc.save();
        }
    });
};
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
// timestamp - passed in or generated here?
// algorithm
//    does a ChatSession already exist for this boardId?
//      if not, create one
//    get ChatSessionId
//    append specified chat to this chatSession
exports.addChatMessageToDb = (chatSessionId, userName, message) => {
    ChatSession_1.default.find({
        id: chatSessionId,
    }, (err, chatSessionDocs) => {
        if (err) {
            console.log(err);
        }
        else if (lodash_1.isArray(chatSessionDocs) && chatSessionDocs.length === 1) {
            const chatSessionDoc = chatSessionDocs[0];
            const chat = { sender: userName, message, timestamp: new Date() };
            chatSessionDoc.chatMessages.push(chat);
            chatSessionDoc.save();
        }
    });
};
exports.getChatSession = (boardId) => {
    const query = ChatSession_1.default.find({ boardId });
    const promise = query.exec();
    return promise.then((chatSessionDocuments) => {
        console.log('chatSessionDocuments');
        if (lodash_1.isArray(chatSessionDocuments) && chatSessionDocuments.length === 1) {
            const chatSessionDocument = chatSessionDocuments[0];
            console.log('chatSessionDocument', chatSessionDocument);
            const chatSessionEntity = chatSessionDocument.toObject();
            return Promise.resolve(chatSessionEntity);
        }
        else {
            return Promise.resolve(null);
        }
    });
};
exports.createChatSessionDocument = (chatSessionEntity) => {
    return ChatSession_1.default.create(chatSessionEntity)
        .then((chatSession) => {
        return Promise.resolve(chatSession);
    });
};
//# sourceMappingURL=dbInterface.js.map
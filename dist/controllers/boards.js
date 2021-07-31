"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoards = exports.createBoard = void 0;
const uuid_1 = require("uuid");
const dbInterface_1 = require("./dbInterface");
function createBoard(request, response, next) {
    console.log('createBoard');
    console.log(request.body);
    const { puzzleId, title, users, startDateTime, lastPlayedDateTime, elapsedTime, solved, difficulty } = request.body;
    const boardEntity = {
        id: uuid_1.v4(),
        puzzleId,
        title,
        users,
        cellContents: {},
        startDateTime,
        lastPlayedDateTime,
        elapsedTime,
        solved,
        difficulty,
    };
    // TEDTODO - send response on reject
    dbInterface_1.createBoardDocument(boardEntity)
        .then((boardDoc) => {
        const boardDocument = boardDoc;
        console.log('added boardDocument');
        console.log(boardDocument);
        console.log(boardDocument.toObject());
        response.status(201).json({
            success: true,
            data: boardDocument,
        });
    });
}
exports.createBoard = createBoard;
function getBoards(request, response) {
    console.log('getBoards handler:');
    return dbInterface_1.getBoardsFromDb()
        .then((boardEntities) => {
        response.json(boardEntities);
    });
}
exports.getBoards = getBoards;
//# sourceMappingURL=boards.js.map
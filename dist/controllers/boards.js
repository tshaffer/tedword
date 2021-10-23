"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateElapsedTime = exports.updateLastPlayedDateTime = exports.addUserToBoard = exports.getBoards = exports.createBoard = void 0;
const uuid_1 = require("uuid");
const dbInterface_1 = require("./dbInterface");
function createBoard(request, response, next) {
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
        response.status(201).json({
            success: true,
            data: boardDocument,
        });
    });
}
exports.createBoard = createBoard;
function getBoards(request, response) {
    return dbInterface_1.getBoardsFromDb()
        .then((boardEntities) => {
        console.log('return from getBoardsFromDb, invoke response.json');
        response.json(boardEntities);
    });
}
exports.getBoards = getBoards;
function addUserToBoard(request, response, next) {
    console.log('addUserToBoard');
    console.log(request.body);
    const { boardId, userName } = request.body;
    // TEDTODO - don't add a user that already exists.
    dbInterface_1.addUserToBoardDb(boardId, userName);
    response.sendStatus(200);
}
exports.addUserToBoard = addUserToBoard;
function updateLastPlayedDateTime(request, response, next) {
    console.log('updateLastPlayedDateTime');
    console.log(request.body);
    const { boardId, lastPlayedDateTime } = request.body;
    dbInterface_1.updateLastPlayedDateTimeDb(boardId, lastPlayedDateTime);
    response.sendStatus(200);
}
exports.updateLastPlayedDateTime = updateLastPlayedDateTime;
function updateElapsedTime(request, response, next) {
    console.log('updateElapsedTime');
    console.log(request.body);
    const { boardId, elapsedTime } = request.body;
    dbInterface_1.updateElapsedTimeDb(boardId, elapsedTime);
    response.sendStatus(200);
}
exports.updateElapsedTime = updateElapsedTime;
//# sourceMappingURL=boards.js.map
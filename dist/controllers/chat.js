"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatMessages = exports.addChatMessage = exports.sendChatMessage = exports.authenticateChat = exports.joinChat = void 0;
const uuid_1 = require("uuid");
const lodash_1 = require("lodash");
const dbInterface_1 = require("./dbInterface");
const app_1 = require("../app");
const ChatSession_1 = __importDefault(require("../models/ChatSession"));
function joinChat(request, response) {
    console.log('joinChat');
    console.log(request.session);
    request.session.boardid = request.body.boardid;
    request.session.username = request.body.username;
    response.json('Joined');
}
exports.joinChat = joinChat;
function authenticateChat(request, response) {
    console.log('authenticateChat');
    console.log(request.body);
    const socketId = request.body.socket_id;
    const channel = request.body.channel_name;
    // Retrieve username from session and use as presence channel user_id
    const presenceData = {
        user_id: request.session.username
    };
    const auth = app_1.pusher.authenticate(socketId, channel, presenceData);
    response.send(auth);
}
exports.authenticateChat = authenticateChat;
function sendChatMessage(request, response) {
    console.log('sendChatMessage');
    const { boardid, username, message } = request.body;
    console.log('presence-' + boardid);
    app_1.pusher.trigger('presence-' + boardid, 'message_sent', {
        boardid,
        username,
        message
    });
    // add message to db
    addChatMessage(boardid, username, message);
    response.send('Message sent and added to db');
}
exports.sendChatMessage = sendChatMessage;
function addChatMessage(boardId, userName, message) {
    return dbInterface_1.getChatSession(boardId).then((existingChatSessionEntity) => {
        if (!lodash_1.isNil(existingChatSessionEntity)) {
            const chatSessionId = existingChatSessionEntity.id;
            dbInterface_1.addChatMessageToDb(chatSessionId, userName, message);
        }
        else {
            const chatSessionEntity = {
                id: uuid_1.v4(),
                boardId,
                chatMessages: []
            };
            return dbInterface_1.createChatSessionDocument(chatSessionEntity)
                .then((chatSessionDoc) => {
                const chatSessionDocument = chatSessionDoc;
                console.log('ChatSessionDocument');
                console.log(chatSessionDocument);
                const chatSessionId = chatSessionDocument.id;
                dbInterface_1.addChatMessageToDb(chatSessionId, userName, message);
            });
        }
    });
}
exports.addChatMessage = addChatMessage;
exports.getChatMessages = (request, response, next) => {
    console.log('getChatMessages');
    console.log('request.query:');
    console.log(request.query);
    const boardId = request.query.id;
    getChatMessagesFromDb(boardId)
        .then((chatMessages) => {
        console.log('chatMessages');
        console.log(chatMessages);
        response.json(chatMessages);
    });
};
const getChatMessagesFromDb = (boardId) => {
    console.log('getChatMessagesFromDb');
    console.log(boardId);
    const query = ChatSession_1.default.find({ boardId });
    query.select(['chatMessages']);
    const promise = query.exec();
    return promise
        .then((chatDocs) => {
        console.log('chatDocs');
        console.log(chatDocs);
        if (lodash_1.isArray(chatDocs) && chatDocs.length === 1) {
            const chatDocsData = chatDocs[0].toObject();
            console.log('chatMessages');
            const chatMessages = [];
            for (const chatMessage of chatDocsData.chatMessages) {
                const { sender, message, timestamp } = chatMessage;
                const chat = { sender, message, timestamp };
                chatMessages.push(chat);
            }
            return Promise.resolve(chatMessages);
        }
    }).catch((err) => {
        console.log(err);
        debugger;
        return Promise.reject(err);
    });
};
//# sourceMappingURL=chat.js.map
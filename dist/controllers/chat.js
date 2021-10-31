"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendChatMessage = exports.authenticateChat = exports.joinChat = void 0;
const app_1 = require("../app");
function joinChat(request, response) {
    console.log('joinChat');
    console.log(request.session);
    request.session.username = request.body.username;
    response.json('Joined');
}
exports.joinChat = joinChat;
function authenticateChat(request, response) {
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
    app_1.pusher.trigger('presence-groupChat', 'message_sent', {
        username: request.body.username,
        message: request.body.message
    });
    response.send('Message sent');
}
exports.sendChatMessage = sendChatMessage;
//# sourceMappingURL=chat.js.map
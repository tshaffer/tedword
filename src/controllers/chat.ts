import { ChatSessionEntity } from 'entities';
import { Request, Response } from 'express';
import { isNil } from 'lodash';
import ChatSession from 'src/models/ChatSession';
import { addChatMessageToDb, getChatSession } from '.';

import { pusher } from '../app';

export function joinChat(request: Request, response: Response) {
  console.log('joinChat');
  console.log(request.session);
  ((request as any).session as any).username = request.body.username;
  response.json('Joined');
}

export function authenticateChat(request: Request, response: Response) {
  const socketId = request.body.socket_id;
  const channel = request.body.channel_name;
  // Retrieve username from session and use as presence channel user_id
  const presenceData = {
    user_id: (request.session as any).username
  };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  response.send(auth);
}

export function sendChatMessage(request: Request, response: Response) {

  const { boardid, username, message } = request.body;

  pusher.trigger('presence-groupChat', 'message_sent', {
    boardid,
    username,
    message
  });

  // add message to db

  response.send('Message sent');
}

export function addChatMessage(request: Request, response: Response) {

  const { boardId, username, message } = request.body;

  getChatSession(boardId).then((chatSessionEntity: ChatSessionEntity | null) => {
    if (isNil(chatSessionEntity)) {
      // add chat session
    }
    // add message to chat session
  })
  // add message to db
  addChatMessageToDb(boardId, username, message);

  response.send('Message added');
}

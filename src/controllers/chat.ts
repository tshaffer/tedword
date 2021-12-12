import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { isNil } from 'lodash';

import { addChatMessageToDb, getChatSession, createChatSessionDocument } from './dbInterface';
import { ChatSessionEntity } from 'entities';

import { pusher } from '../app';

export function joinChat(request: Request, response: Response) {
  console.log('joinChat');
  console.log(request.session);
  ((request as any).session as any).boardid = request.body.boardid;
  ((request as any).session as any).username = request.body.username;
  response.json('Joined');
}

export function authenticateChat(request: Request, response: Response) {
  console.log('authenticateChat');
  console.log(request.body);
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
  
  console.log('sendChatMessage');
  const { boardid, username, message } = request.body;
  console.log('presence-' + boardid);

  pusher.trigger('presence-' + boardid, 'message_sent', {
    boardid,
    username,
    message
  });

  // add message to db

  response.send('Message sent');
}

export function addChatMessage(request: Request, response: Response) {

  const { boardId, userName, message } = request.body;

  getChatSession(boardId).then((existingChatSessionEntity: ChatSessionEntity | null) => {
    if (!isNil(existingChatSessionEntity)) {
      const chatSessionId: string = existingChatSessionEntity.id;
      addChatMessageToDb(chatSessionId, userName, message);
    } else {
      const chatSessionEntity: ChatSessionEntity = {
        id: uuidv4(),
        boardId,
        chatMessages: []
      };
      createChatSessionDocument(chatSessionEntity)
        .then((chatSessionDoc) => {
          const chatSessionDocument = chatSessionDoc as Document;
          console.log('ChatSessionDocument');
          console.log(chatSessionDocument);
          const chatSessionId: string = chatSessionDocument.id;
          addChatMessageToDb(chatSessionId, userName, message);
        })
    }
  })
  response.send('Message added');
}

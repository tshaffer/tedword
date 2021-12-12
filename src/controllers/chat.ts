import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { isArray, isNil } from 'lodash';

import { addChatMessageToDb, getChatSession, createChatSessionDocument } from './dbInterface';
import { Chat, ChatSessionEntity } from '../types';

import { pusher } from '../app';
import ChatSession from '../models/ChatSession';

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
  addChatMessage(boardid, username, message);

  response.send('Message sent and added to db');
}

export function addChatMessage(boardId: string, userName: string, message: string): Promise<any> {

  return getChatSession(boardId).then((existingChatSessionEntity: ChatSessionEntity | null) => {
    if (!isNil(existingChatSessionEntity)) {
      const chatSessionId: string = existingChatSessionEntity.id;
      addChatMessageToDb(chatSessionId, userName, message);
    } else {
      const chatSessionEntity: ChatSessionEntity = {
        id: uuidv4(),
        boardId,
        chatMessages: []
      };
      return createChatSessionDocument(chatSessionEntity)
        .then((chatSessionDoc) => {
          const chatSessionDocument = chatSessionDoc as Document;
          console.log('ChatSessionDocument');
          console.log(chatSessionDocument);
          const chatSessionId: string = chatSessionDocument.id;
          addChatMessageToDb(chatSessionId, userName, message);
        })
    }
  })
}

export const getChatMessages = (request: Request, response: Response, next: any) => {

  console.log('getChatMessages');

  console.log('request.query:');
  console.log(request.query);

  const boardId: string = request.query.id as string;

  getChatMessagesFromDb(boardId)
    .then((chatMessages: any) => {
      console.log('chatMessages');
      console.log(chatMessages);
      response.json(chatMessages);
    })
};

const getChatMessagesFromDb = (boardId: string): Promise<Chat[]> => {
  console.log('getChatMessagesFromDb');
  console.log(boardId);
  const query = ChatSession.find({ boardId });
  query.select(['chatMessages']);
  const promise = query.exec();
  return promise
    .then((chatDocs: any) => {
      console.log('chatDocs')
      console.log(chatDocs);
      if (isArray(chatDocs) && chatDocs.length === 1) {
        const chatDocsData: any = chatDocs[0].toObject();
        console.log('chatMessages');

        const chatMessages: Chat[] = [];
        for (const chatMessage of chatDocsData.chatMessages) {
          const { sender, message, timestamp } = chatMessage;
          const chat: Chat = { sender, message, timestamp };
          chatMessages.push(chat);
        }
        return Promise.resolve(chatMessages);
      }
    }).catch((err: any) => {
      console.log(err);
      debugger;
      return Promise.reject(err);
    });
}

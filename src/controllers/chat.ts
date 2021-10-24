import { Request, Response } from 'express';

import { pusher } from '../app';

// var session = require('express-session')
// declare module 'express-session' {
//   interface SessionData {
//     user: string;
//   }
// }

// declare global {
//   namespace Express {
//     interface Session {
//       _user?: string
//     }
//   }
// }

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
  pusher.trigger('presence-groupChat', 'message_sent', {
    username: request.body.username,
    message: request.body.message
  });
  response.send('Message sent');
}

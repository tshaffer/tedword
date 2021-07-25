import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { BoardEntity } from '../types';
import { createBoardDocument } from './dbInterface';

export function createBoard(request: Request, response: Response, next: any) {
  console.log('createBoard');
  console.log(request.body);
  const { puzzleId, title, users, startDateTime, lastPlayedDateTime, elapsedTime, solved, difficulty } = request.body;

  const boardEntity: BoardEntity = {
    id: uuidv4(),
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
  createBoardDocument(boardEntity)
    .then((boardDoc) => {
      const boardDocument = boardDoc as Document;
      console.log('added boardDocument');
      console.log(boardDocument);
      console.log(boardDocument.toObject());

      response.status(201).json({
        success: true,
        data: boardDocument,
      });
    });
}

import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { BoardEntity } from '../types';
import { addUserToBoardDb, createBoardDocument, getBoardsFromDb, updateElapsedTimeDb, updateLastPlayedDateTimeDb } from './dbInterface';

export function createBoard(request: Request, response: Response, next: any) {

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
      response.status(201).json({
        success: true,
        data: boardDocument,
      });
    });
}

export function getBoards(request: Request, response: Response) {
  return getBoardsFromDb()
    .then((boardEntities: BoardEntity[]) => {
      console.log('return from getBoardsFromDb, invoke response.json');
      response.json(boardEntities);
    });
}

export function addUserToBoard(request: Request, response: Response, next: any) {

  console.log('addUserToBoard');
  console.log(request.body);

  const { boardId, userName } = request.body;

  // TEDTODO - don't add a user that already exists.
  addUserToBoardDb(boardId, userName);

  response.sendStatus(200);
}

export function updateLastPlayedDateTime(request: Request, response: Response, next: any) {

  console.log('updateLastPlayedDateTime');
  console.log(request.body);

  const { boardId, lastPlayedDateTime } = request.body;

  updateLastPlayedDateTimeDb(boardId, lastPlayedDateTime);

  response.sendStatus(200);
}

export function updateElapsedTime(request: Request, response: Response, next: any) {

  // console.log('updateElapsedTime');
  // console.log(request.body);

  const { boardId, elapsedTime } = request.body;

  updateElapsedTimeDb(boardId, elapsedTime);

  response.sendStatus(200);
}

import * as fs from 'fs';

import { v4 as uuidv4 } from 'uuid';

import { Request, Response } from 'express';
import { Document } from 'mongoose';

import { PuzzleEntity, UserEntity } from '../types/entities';
import { createPuzzle, createUserDocument } from './dbInterface';
import { PuzCrosswordSpec } from '../types';

const PuzCrossword = require('@confuzzle/puz-crossword').PuzCrossword;

export function createUser(request: Request, response: Response, next: any) {
  console.log('createUser');
  console.log(request.body);
  const { userName, password, email, cellTextColorPartnerBoard } = request.body;
  const userEntity: UserEntity = {
    userName,
    password,
    email,
    cellTextColorPartnerBoard,
  };
  // TEDTODO - send response on reject
  createUserDocument(userEntity)
    .then((userDoc) => {
      const userDocument = userDoc as Document;
      console.log('added userDocument');
      console.log(userDocument);
      console.log(userDocument.toObject());

      response.status(201).json({
        success: true,
        data: userDocument,
      });
    });
}

export function loadPuzzle(request: Request, response: Response, next: any) {
  console.log('loadPuzzle');

  console.log('request.query:');
  console.log(request.query);

  const puzzlePath: string = request.query.puzzlePath as string;

  fs.readFile(puzzlePath, (err, puzData: Buffer) => {
    if (err) throw err;
    console.log(puzData);

    const pc: PuzCrosswordSpec = PuzCrossword.from(puzData);
    console.log(pc);

    const puzzleEntity: PuzzleEntity = {
      id: uuidv4(),
      title: pc.title,
      author: pc.author,
      puzData: puzData,
    };

  // TEDTODO - send response on reject
  createPuzzle(puzzleEntity)
    .then((puzzleDoc) => {
      const puzzleDocument = puzzleDoc as Document;
      console.log('added userDocument');
      console.log(puzzleDocument);
      console.log(puzzleDocument.toObject());

      response.status(201).json({
        success: true,
        data: puzzleDocument,
      });
    });

  });
}

